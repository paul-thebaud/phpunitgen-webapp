import { Route } from "vue-router";
import { Position } from "vue-router/types/router";
import AsyncLoadingComponent from "@/components/async/AsyncLoadingComponent.vue";
import AsyncErrorComponent from "@/components/async/AsyncErrorComponent.vue";
import { Component, CreateElement, RenderContext, VNode } from "vue";
import { AsyncComponentFactory, AsyncComponentPromise } from "vue/types/options";

/**
 * Lazy load a view with loading and error components.
 *
 * @param {Promise<typeof import("*.vue")>} AsyncView
 *
 * @returns {() => Promise<Component>}
 *
 * @see https://github.com/vuejs/vuejs.org/issues/1534
 */
function lazyLoadView(AsyncView: AsyncComponentPromise): () => Promise<Component> {
    const AsyncHandler: AsyncComponentFactory<unknown, unknown, unknown, unknown> = () => ({
        component: AsyncView,
        loading: AsyncLoadingComponent,
        delay: 200,
        error: AsyncErrorComponent,
        timeout: 5000,
    });

    return (): Promise<Component> => Promise.resolve({
        functional: true,
        render(createElement: CreateElement, { data, children }: RenderContext): VNode {
            return createElement(AsyncHandler, data, children);
        },
    });
}

/**
 * The routes of application.
 */
export const routes = [
    {
        path: "/",
        name: "home",
        component: lazyLoadView(
            import(/* webpackChunkName: "home-view" */"../views/HomeView.vue") as unknown as AsyncComponentPromise
        ),
    },
    {
        path: "/tool",
        name: "tool",
        component: lazyLoadView(
            import(/* webpackChunkName: "tool-view" */"../views/ToolView.vue") as unknown as AsyncComponentPromise
        ),
    },
    {
        path: "/themes",
        name: "themes",
        component: lazyLoadView(
            import(/* webpackChunkName: "themes-view" */"../views/ThemesView.vue") as unknown as AsyncComponentPromise
        ),
    },
    {
        path: "/configuration",
        name: "configuration",
        component: lazyLoadView(
            import(/* webpackChunkName: "configuration-view" */"../views/ConfigurationView.vue") as unknown as AsyncComponentPromise
        ),
    },
    {
        path: "/legal",
        name: "legal",
        component: lazyLoadView(
            import(/* webpackChunkName: "legal-view" */"../views/LegalView.vue") as unknown as AsyncComponentPromise
        ),
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
