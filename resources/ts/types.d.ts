declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}

declare module "vue-radial-progress" {
    export default any;
}

declare module "vue-gtag" {
    const bootstrap: () => Promise<unknown>;

    export default any;
    export {
        bootstrap
    };
}

declare module "vue-codemirror" {
    const codemirror: object;

    export {
        codemirror,
    };
}
