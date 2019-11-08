import { Route } from "vue-router";
import { Position } from "vue-router/types/router";
import HomeView from "@/views/HomeView.vue";
import ToolView from "@/views/ToolView.vue";

/**
 * The routes of application.
 */
export const routes = [
    { path: "/", name: "home", component: HomeView },
    { path: "/tool", name: "tool", component: ToolView },
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
