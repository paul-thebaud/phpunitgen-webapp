<template>
    <codemirror v-if="show"
                :value="code"
                :options="options"
                @input="handleInput"/>
</template>

<script>
    import "codemirror/lib/codemirror.css";
    import "codemirror/mode/javascript/javascript";
    import "codemirror/mode/php/php";
    import { codemirror } from "vue-codemirror";

    export default {
        components: {
            codemirror,
        },
        props: {
            code: String,
            options: Object,
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
