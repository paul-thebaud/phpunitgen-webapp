declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}

declare module "svg-vue" {
    export default any;
}

declare module "vue-radial-progress" {
    export default any;
}

declare module "vue-codemirror" {
    const codemirror: object;

    export {
        codemirror,
    };
}

declare const process: { env: Record<string, string | undefined> };
