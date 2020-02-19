<template>
  <div
    :id="id"
    class="list-field"
  >
    <label>
      {{ label }}
    </label>

    <BInputGroup class="mb-2">
      <BInput
        v-model="input"
        :placeholder="placeholder"
        type="text"
        autocomplete="new-password"
        @keyup.enter="handleAdd"
      />
      <BInputGroupAppend>
        <BButton
          variant="primary"
          @click="handleAdd"
        >
          <FontAwesomeIcon icon="plus" />
        </BButton>
      </BInputGroupAppend>
    </BInputGroup>

    <BInputGroup
      v-for="(value, key) in values"
      :key="`${id}-${key}`"
      class="mt-1"
    >
      <BInput
        v-model="values[key]"
        type="text"
        autocomplete="new-password"
        @input="handleChange"
      />
      <BInputGroupAppend>
        <BButton
          variant="secondary"
          @click="handleRemove(key)"
        >
          <FontAwesomeIcon icon="times" />
        </BButton>
      </BInputGroupAppend>
    </BInputGroup>

    <BFormText>
      {{ help }}
    </BFormText>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Prop } from "vue-property-decorator";

    @Component
    export default class ListField extends Vue {
        @Prop(String)
        protected readonly id!: string;

        @Prop(String)
        protected readonly label!: string;

        @Prop(String)
        protected readonly placeholder!: string;

        @Prop(String)
        protected readonly help!: string;

        @Prop(Array)
        protected readonly value!: string[];

        protected input = "";

        protected values = this.value;

        protected handleAdd(): void {
            this.values.push(this.input);
            this.input = "";

            this.handleChange();
        }

        protected handleRemove(key: number): void {
            this.values.splice(key, 1);

            this.handleChange();
        }

        protected handleChange(): void {
            const uniqueValues = new Set(this.values.filter((value) => value !== ""));

            this.values = Array.from(uniqueValues.values());

            this.$emit("input", this.values);
        }
    }
</script>
