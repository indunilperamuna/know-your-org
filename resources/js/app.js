import { createPinia } from 'pinia'
import { useStyleStore } from '@/Stores/style.js'

import { darkModeKey, styleKey } from '@/config.js'

import { createApp, h } from "vue";
import { createInertiaApp, Link, Head } from "@inertiajs/inertia-vue3";
import { InertiaProgress } from "@inertiajs/progress";
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import { ZiggyVue } from "ziggy-vue";
import { Ziggy } from "./ziggy";
import '../css/app.css';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel'
const pinia = createPinia()


createInertiaApp({
    resolve: async (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            .component("Link", Link)
            .component("Head", Head)
            .mixin({ methods: { route } })
            .mount(el);
    },
});

InertiaProgress.init({ color: '#4B5563' })

const styleStore = useStyleStore(pinia)

/* App style */
styleStore.setStyle(localStorage[styleKey] ?? 'basic')

/* Dark mode */
if ((!localStorage[darkModeKey] && window.matchMedia('(prefers-color-scheme: dark)').matches) || localStorage[darkModeKey] === '1') {
    styleStore.setDarkMode(true)
}
