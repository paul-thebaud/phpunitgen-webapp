<template>
    <div :id="id">
        <label>
            {{ label }}
        </label>
        <BInput @input="handleInput"
                :value="value"
                :placeholder="placeholder"
                type="text"
                autocomplete="new-password"/>
        <BFormText>
            {{ help }}
        </BFormText>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Prop } from "vue-property-decorator";

    @Component
    export default class TextField extends Vue {
        @Prop(String)
        protected id!: string;

        @Prop(String)
        protected label!: string;

        @Prop(String)
        protected placeholder!: string;

        @Prop(String)
        protected help!: string;

        @Prop(String)
        protected value!: string;

        protected handleInput(value: string) {
            this.$emit("input", value);
        }
    };
</script>
