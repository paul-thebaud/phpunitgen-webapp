<template>
  <div :id="id">
    <label>
      {{ label }}
    </label>
    <BInput
      :value="value"
      :placeholder="placeholder"
      type="text"
      autocomplete="new-password"
      @input="handleInput"
    />
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

        protected handleInput(value: string): void {
            this.$emit("input", value);
        }
    }
</script>
