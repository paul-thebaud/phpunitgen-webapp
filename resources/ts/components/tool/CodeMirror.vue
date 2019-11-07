<template>
    <codemirror :value="code"
                :options="options"
                @input="handleInput"/>
</template>

<script>
    import "codemirror/mode/javascript/javascript";
    import "codemirror/mode/php/php";
    import { codemirror } from "vue-codemirror";

    export default {
        components: {
            codemirror,
        },
        props: {
            code: {
                required: true,
                type: String,
            },
            options: {
                required: true,
                type: Object,
            },
        },
        methods: {
            handleInput(code) {
                this.$emit("input", code);
            },
        },
    };
</script>

<style scoped>

</style>
