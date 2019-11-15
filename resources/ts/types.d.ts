declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}

declare module "vue-radial-progress" {
}

declare module "vue-codemirror" {
    const codemirror: object;

    export {
        codemirror,
    };
}
