declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
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
