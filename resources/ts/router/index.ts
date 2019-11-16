import { Route } from "vue-router";
import { Position } from "vue-router/types/router";

/**
 * The routes of application.
 */
export const routes = [
    {
        path: "/",
        name: "home",
        component: () => import(/* webpackChunkName: "home-view" */"../views/HomeView.vue")
    },
    {
        path: "/tool",
        name: "tool",
        component: () => import(/* webpackChunkName: "tool-view" */"../views/ToolView.vue")
    },
    {
        path: "/themes",
        name: "themes",
        component: () => import(/* webpackChunkName: "themes-view" */"../views/ThemesView.vue")
    },
    {
        path: "/configuration",
        name: "configuration",
        component: () => import(/* webpackChunkName: "configuration-view" */"../views/ConfigurationView.vue")
    },
    {
        path: "/legal",
        name: "legal",
        component: () => import(/* webpackChunkName: "legal-view" */"../views/LegalView.vue")
    },
];

/**
 * Tells to scroll to previous position or top using previous position.
 *
 * @param {Route} to
 * @param {Route} from
 * @param {Position | void} savedPosition
 *
 * @returns {Position | void}
 */
export function scrollBehavior(to: Route, from: Route, savedPosition: Position | void): Position | void {
    if (savedPosition) {
        return savedPosition;
    }

    return { x: 0, y: 0 };
}
