import St from 'gi://St';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension, gettext as _ } from 'resource:///org/gnome/shell/extensions/extension.js';

import * as Fs from './utils/fs.js';
import { Storage } from './utils/storage.js';
import { Applet, PanelPosition } from './applets/applet.js';
import { light_or_dark } from './utils/misc.js';
import { TimerApplet } from './applets/timer.js';
import { AlarmApplet } from './applets/alarm.js';
import { TodoApplet } from './applets/todo/main.js';
import { PomodoroApplet } from './applets/pomodoro.js';
import { StopwatchApplet } from './applets/stopwatch.js';
import { FlashcardsApplet } from './applets/flashcards.js';
import { MasterPanel } from './applets/master.js';

//
// To register a new applet:
//
//   1. Import the applet here.
//   2. Add an entry to this map.
//   3. Add an entry to the storage config.
//
export const applets = [
    [ 'todo', TodoApplet ],
    [ 'alarm', AlarmApplet ],
    [ 'timer', TimerApplet ],
    [ 'pomodoro', PomodoroApplet ],
    [ 'stopwatch', StopwatchApplet ],
    [ 'flashcards', FlashcardsApplet ],
] as const;

export class Cronomix {
    storage = new Storage({
        version: 0,
        file: '~/.config/cronomix/global.json',

        values: {
            todo:                    { tag: 'boolean', value: true },
            alarm:                   { tag: 'boolean', value: true },
            timer:                   { tag: 'boolean', value: true },
            pomodoro:                { tag: 'boolean', value: true },
            stopwatch:               { tag: 'boolean', value: true },
            flashcards:              { tag: 'boolean', value: true },
            group_applets_in_panel: { tag: 'enum',    value: 'separate', enum: ['separate', 'combined'] },
            theme_file:              { tag: 'file',    value: '', start: ext.path + '/data/themes/' },
            lazy_list_page_size:     { tag: 'number',  value: 20, range: [1, 100000] },
        },

        groups: [
            ['todo', 'alarm', 'timer', 'pomodoro', 'stopwatch', 'flashcards'],
            ['group_applets_in_panel', 'theme_file', 'lazy_list_page_size'],
        ],

        infos: {
            group_applets_in_panel: _('Choose whether each applet gets its own top bar button or all enabled applets are collaged into a single top bar button.'),
            lazy_list_page_size: _('Number of items shown each time you press "show more" in a scroll list.\nMaking this number very large can cause performance issues.')
        },

        translations: {
            todo: _('Todo'),
            alarm: _('Alarm'),
            timer: _('Timer'),
            pomodoro: _('Pomodoro'),
            stopwatch: _('Stopwatch'),
            flashcards: _('Flashcards'),
            group_applets_in_panel: _('Top bar button layout'),
            separate: _('Separate buttons'),
            combined: _('Single combined menu button'),
            theme_file: _('Theme css (empty for auto selection)'),
            lazy_list_page_size: _('Lazy list page size'),
        }
    });

    enabled_applets = new Map<string, Applet>();
    master_panel: MasterPanel | null = null;

    #stylesheet?: string;
    #theme_change_sig = 0;
    #settings_sig = 0;
    #ignore_next_theme_change_sig = false;

    constructor () {
        this.#load_theme();
        this.#load_applets();
        this.storage.subscribe('theme_file', () => this.#load_theme());
        this.storage.subscribe('group_applets_in_panel', () => this.#update_panel_layout());
        this.#theme_change_sig = St.ThemeContext.get_for_stage(global.stage).connect('changed', () => this.#load_theme());
        try {
            this.#settings_sig = St.Settings.get_default().connect('notify::color-scheme', () => this.#load_theme());
        } catch {}
        this.#update_panel_layout();
    }

    destroy () {
        const theme_context = St.ThemeContext.get_for_stage(global.stage);

        if (this.#theme_change_sig)  {
            theme_context.disconnect(this.#theme_change_sig);
            this.#theme_change_sig = 0;
        }

        if (this.#settings_sig) {
            try { St.Settings.get_default().disconnect(this.#settings_sig); } catch {}
            this.#settings_sig = 0;
        }

        if (this.#stylesheet) {
            const existing_theme = theme_context.get_theme();
            if (existing_theme) existing_theme.unload_stylesheet(Fs.file_new_for_path(this.#stylesheet));
        }

        if (this.master_panel) {
            this.master_panel.destroy();
            this.master_panel = null;
        }

        for (const [, applet] of this.enabled_applets) applet.destroy();
        this.storage.destroy();
    }

    #load_applets () {
        let loaded_an_applet = false;

        for (const [applet_name, applet_ctor] of applets) {
            if (this.storage.read[applet_name].value) {
                loaded_an_applet = true;
                const applet = new applet_ctor(this);
                this.enabled_applets.set(applet_name, applet);
            }

            this.storage.subscribe(applet_name, ({ value }) => {
                const applet = this.enabled_applets.get(applet_name);

                if (value && !applet) {
                    const applet = new applet_ctor(this);
                    this.enabled_applets.set(applet_name, applet);
                } else if (!value && applet) {
                    this.enabled_applets.delete(applet_name);
                    applet.destroy();
                }

                this.#update_panel_layout();
            });
        }

        // We must load at least one applet or else the user
        // has no way of interacting with the extension...
        if (! loaded_an_applet) {
            const [applet_name] = applets[0];
            this.storage.modify(applet_name, s => s.value = true);
        }
    }

    #update_panel_layout () {
        const layout_mode = this.storage.read.group_applets_in_panel.value;

        if (layout_mode === 'combined') {
            for (const [, applet] of this.enabled_applets) {
                applet.panel_item.hide();
            }

            if (! this.master_panel) {
                this.master_panel = new MasterPanel(this);
            }
            this.master_panel.set_panel_position(PanelPosition.RIGHT);
            this.master_panel.refresh_tabs();
        } else {
            if (this.master_panel) {
                this.master_panel.destroy();
                this.master_panel = null;
            }

            for (const [, applet] of this.enabled_applets) {
                applet.panel_item.show();
                const pos = (applet as any).storage?.read?.panel_position?.value ?? PanelPosition.RIGHT;
                applet.set_panel_position(pos);
            }
        }
    }

    #load_theme () {
        if (this.#ignore_next_theme_change_sig) return;
        this.#ignore_next_theme_change_sig = true;

        let stylesheet = this.storage.read.theme_file.value;

        // Pick a stylesheet automatically:
        if (! stylesheet) {
            let style = '';

            try {
                const color_scheme = St.Settings.get_default().color_scheme;
                if (color_scheme === 1) style = 'dark';
                else if (color_scheme === 2) style = 'light';
            } catch {}

            if (! style) {
                const dummy = new St.Widget({ visible: false, style_class: 'popup-menu-content' });
                global.stage.add_child(dummy);
                const theme_node = dummy.get_theme_node();

                const [ok, col] = theme_node.lookup_color('background-color', false);
                if (ok) {
                    style = light_or_dark(col.red, col.green, col.blue);
                } else {
                    const [ok_bg, col_bg] = theme_node.lookup_color('theme_bg_color', false);
                    if (ok_bg) {
                        style = light_or_dark(col_bg.red, col_bg.green, col_bg.blue);
                    } else {
                        const bg = theme_node.get_background_color();
                        if (bg && bg.alpha > 0) {
                            style = light_or_dark(bg.red, bg.green, bg.blue);
                        } else {
                            const fg = theme_node.get_color('color');
                            if (fg && fg.alpha > 0) {
                                style = light_or_dark(fg.red, fg.green, fg.blue) === 'light' ? 'dark' : 'light';
                            }
                        }
                    }
                }

                dummy.destroy();
            }

            if (! style) style = 'dark';
            stylesheet = ext.path + '/data/themes/' + style + '.css';
        }

        // Set theme:
        try {
            const theme_context  = St.ThemeContext.get_for_stage(global.stage);
            const existing_theme = theme_context.get_theme();

            if (existing_theme) {
                if (this.#stylesheet) existing_theme.unload_stylesheet(Fs.file_new_for_path(this.#stylesheet));
                existing_theme.load_stylesheet(Fs.file_new_for_path(stylesheet));
                theme_context.set_theme(existing_theme);
            } else {
                Main.setThemeStylesheet(stylesheet)
                Main.loadTheme();
            }
        } catch (e) {
            logError(e);
            this.#ignore_next_theme_change_sig = false;
            return;
        }

        { // Load colors:
            const dummy = new St.Widget({ visible: false, style_class: 'cronomix-custom-css' });
            global.stage.add_child(dummy);

            const theme_node = dummy.get_theme_node();

            for (const key of Object.keys(colors)) {
                const [ok, col] = theme_node.lookup_color(key, false);
                if (ok) colors[key] = col.to_string();
            }

            dummy.destroy();
        }

        this.#stylesheet = stylesheet;
        this.#ignore_next_theme_change_sig = false;
    }
}

export const colors: Record<string, string> = {
    ['-cronomix-link-color']:          '#73C2FE',
    ['-cronomix-tag-ref-color']:       '#FFAB42',
    ['-cronomix-markup-raw-fg']:       '#93a1a1',
    ['-cronomix-markup-raw-bg']:       '#002b36',
    ['-cronomix-markup-highlight-fg']: '#000000',
    ['-cronomix-markup-highlight-bg']: '#FFAB42',
};

export var ext: Extension;
export default class E extends Extension {
    cronomix: Cronomix | null = null;
    enable  () { ext = this; this.cronomix = new Cronomix(); }
    disable () { this.cronomix?.destroy(); this.cronomix = null; ext = null!; }
}
