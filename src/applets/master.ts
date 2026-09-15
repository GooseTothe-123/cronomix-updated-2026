import St from 'gi://St';
import Clutter from 'gi://Clutter';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Button as PanelButton } from 'resource:///org/gnome/shell/ui/panelMenu.js';
import { gettext as _ } from 'resource:///org/gnome/shell/extensions/extension.js';

import * as Misc from '../utils/misc.js';
import { Button } from '../utils/button.js';
import { ContextMenu, PanelPosition } from './applet.js';
import { Cronomix, applets } from '../extension.js';

const applet_icons: Record<string, string> = {
    todo:       'cronomix-todo-symbolic',
    alarm:      'cronomix-alarm-symbolic',
    timer:      'cronomix-timer-symbolic',
    pomodoro:   'cronomix-pomodoro-symbolic',
    stopwatch:  'cronomix-stopwatch-symbolic',
    flashcards: 'cronomix-flashcards-symbolic',
};

const applet_labels: Record<string, string> = {
    get todo ()       { return _('Todo'); },
    get alarm ()      { return _('Alarm'); },
    get timer ()      { return _('Timer'); },
    get pomodoro ()   { return _('Pomodoro'); },
    get stopwatch ()  { return _('Stopwatch'); },
    get flashcards () { return _('Flashcards'); },
};

export class MasterPanel {
    ext: Cronomix;
    panel_item: PanelButton;
    panel_icon: St.Icon;
    panel_label: St.Label;

    #session_signal_id: number;
    #active_applet_id: string | null = null;

    #header_box: St.BoxLayout;
    #content_box: St.BoxLayout;
    #wrapper: Misc.CellBox;
    #tab_buttons = new Map<string, Button>();
    #context_menu: ContextMenu | null = null;
    #original_parents = new Map<string, Clutter.Actor>();

    constructor (ext: Cronomix) {
        this.ext = ext;

        //
        // Panel item & icon
        //
        this.panel_item = new PanelButton(0.5, 'cronomix-master-applet');
        this.panel_item.add_style_class_name('cronomix-panel-button');

        const box = new St.BoxLayout();
        this.panel_item.add_child(box);

        this.panel_icon = new St.Icon({ style_class: 'system-status-icon' });
        this.panel_icon.gicon = Misc.get_icon('cronomix-timer-symbolic');
        box.add_child(this.panel_icon);

        this.panel_label = new St.Label({ visible: false, y_align: Clutter.ActorAlign.CENTER });
        box.add_child(this.panel_label);

        //
        // Menu container layout
        //
        this.#wrapper = new Misc.CellBox(this.panel_item.menu.box);
        this.panel_item.menu.box.add_style_class_name('cronomix-master-menu cronomix-menu');

        const main_container = new St.BoxLayout({ vertical: true, x_expand: true });
        this.#wrapper.cell.add_child(main_container);

        // Header bar with applet tabs & settings button
        this.#header_box = new St.BoxLayout({ vertical: false, x_expand: true, style_class: 'cronomix-spacing' });
        main_container.add_child(this.#header_box);

        this.#content_box = new St.BoxLayout({ vertical: true, x_expand: true, y_expand: true });
        main_container.add_child(this.#content_box);

        //
        // Listeners
        //
        this.panel_item.connect('captured-event', (_: unknown, event: Clutter.Event) => {
            if (event.type() === Clutter.EventType.BUTTON_PRESS) {
                if (event.get_button() === Clutter.BUTTON_SECONDARY) {
                    this.#content_box.hide();
                    this.#header_box.hide();
                    if (! this.#context_menu) {
                        this.#context_menu = new ContextMenu(this.ext);
                        this.#wrapper.cell.add_child(this.#context_menu.actor);
                    }
                } else {
                    this.#context_menu?.actor.destroy();
                    this.#context_menu = null;
                    this.#header_box.show();
                    this.#content_box.show();
                }
            }
        });

        this.panel_item.menu.connect('open-state-changed', (_: unknown, state: boolean) => {
            if (state) {
                const area = Misc.get_monitor_work_area(this.panel_item.menu.actor);
                this.panel_item.menu.actor.style = `max-width: ${area.width - 6}px; max-height: ${area.height - 32}px`;
                this.refresh_tabs();
            }
        });

        this.#session_signal_id = Main.sessionMode.connect('updated', (s: any) => {
            if (s.currentMode === 'user' || s.parentMode === 'user') {
                this.panel_item.show();
            } else if (s.currentMode === 'unlock-dialog') {
                this.panel_item.hide();
            }
        });

        this.refresh_tabs();
    }

    set_panel_position (position: PanelPosition) {
        const idx = (position === PanelPosition.RIGHT) ? 0 : -1;
        delete Main.panel.statusArea['cronomix-master'];
        Main.panel.addToStatusArea('cronomix-master', this.panel_item, idx, position);
    }

    refresh_tabs () {
        // Clear existing tab buttons
        for (const [, btn] of this.#tab_buttons) btn.actor.destroy();
        this.#tab_buttons.clear();
        this.#header_box.destroy_all_children();

        const tabs_scroll = new St.BoxLayout({ vertical: false, x_expand: true, style_class: 'cronomix-spacing' });
        this.#header_box.add_child(tabs_scroll);

        let first_enabled_id: string | null = null;

        for (const [applet_id] of applets) {
            const applet = this.ext.enabled_applets.get(applet_id);
            if (! applet) continue;

            if (! first_enabled_id) first_enabled_id = applet_id;

            const icon_name = applet_icons[applet_id] ?? 'cronomix-timer-symbolic';
            const label_str = applet_labels[applet_id] ?? applet_id;

            const tab_btn = new Button({
                parent: tabs_scroll,
                icon: icon_name,
                label: label_str,
                style_class: 'cronomix-button',
            });

            tab_btn.subscribe('left_click', () => this.switch_tab(applet_id));
            this.#tab_buttons.set(applet_id, tab_btn);
        }

        // Global settings button
        const settings_btn = new Button({
            parent: this.#header_box,
            icon: 'cronomix-wrench-symbolic',
            style_class: 'cronomix-button',
        });
        settings_btn.subscribe('left_click', () => this.show_global_settings());

        if (this.#active_applet_id && this.ext.enabled_applets.has(this.#active_applet_id)) {
            this.switch_tab(this.#active_applet_id);
        } else if (first_enabled_id) {
            this.switch_tab(first_enabled_id);
        }
    }

    switch_tab (applet_id: string) {
        this.#active_applet_id = applet_id;

        // Update tab button highlights
        for (const [id, btn] of this.#tab_buttons) {
            btn.checked = (id === applet_id);
        }

        // Detach previous applet menus and attach current active applet menu
        this.#content_box.destroy_all_children();

        const active_applet = this.ext.enabled_applets.get(applet_id);
        if (! active_applet) return;

        const parent = active_applet.menu.get_parent();
        if (parent && parent !== this.#content_box) {
            this.#original_parents.set(applet_id, parent);
            parent.remove_child(active_applet.menu);
        }

        this.#content_box.add_child(active_applet.menu);
        active_applet.menu.show();
    }

    show_global_settings () {
        this.#content_box.destroy_all_children();

        const done_fn = () => {
            if (this.#active_applet_id) this.switch_tab(this.#active_applet_id);
        };

        const check_fn = () => {
            let n_enabled = 0;
            for (const [applet_name] of applets) {
                if (this.ext.storage.read[applet_name].value) n_enabled++;
            }
            return n_enabled ? '' : _('At least one applet must be enabled.');
        };

        const settings_view = this.ext.storage.render(done_fn, check_fn);
        this.#content_box.add_child(settings_view);
    }

    restore_applet_menus () {
        for (const [applet_id, orig_parent] of this.#original_parents) {
            const applet = this.ext.enabled_applets.get(applet_id);
            if (applet && applet.menu.get_parent() !== orig_parent) {
                const current_parent = applet.menu.get_parent();
                if (current_parent) current_parent.remove_child(applet.menu);
                orig_parent.add_child(applet.menu);
            }
        }
        this.#original_parents.clear();
    }

    destroy () {
        this.restore_applet_menus();
        Main.sessionMode.disconnect(this.#session_signal_id);
        delete Main.panel.statusArea['cronomix-master'];
        this.panel_item.destroy();
    }
}
