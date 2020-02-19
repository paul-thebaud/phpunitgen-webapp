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
        protected readonly id!: string;

        @Prop(String)
        protected readonly label!: string;

        @Prop(String)
        protected readonly placeholder!: string;

        @Prop(String)
        protected readonly help!: string;

        @Prop(String)
        protected readonly value!: string;

        protected handleInput(value: string): void {
            this.$emit("input", value);
        }
    }
</script>
