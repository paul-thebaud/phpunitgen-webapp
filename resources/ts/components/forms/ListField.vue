<template>
    <div :id="id"
         class="list-field">
        <label>
            {{ label }}
        </label>

        <BInputGroup class="mb-2">
            <BInput v-model="input"
                    @keyup.enter="handleAdd"
                    :placeholder="placeholder"
                    type="text"
                    autocomplete="new-password"/>
            <BInputGroupAppend>
                <BButton @click="handleAdd"
                         variant="primary">
                    <FontAwesomeIcon icon="plus"></FontAwesomeIcon>
                </BButton>
            </BInputGroupAppend>
        </BInputGroup>

        <BInputGroup v-for="(value, key) in values"
                     :key="`${id}-${key}`"
                     class="mt-1">
            <BInput v-model="values[key]"
                    @input="handleChange"
                    type="text"
                    autocomplete="new-password"/>
            <BInputGroupAppend>
                <BButton @click="handleRemove(key)"
                         variant="secondary">
                    <FontAwesomeIcon icon="times"></FontAwesomeIcon>
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
        protected id!: string;

        @Prop(String)
        protected label!: string;

        @Prop(String)
        protected placeholder!: string;

        @Prop(String)
        protected help!: string;

        @Prop(Array)
        protected value!: string[];

        protected input = "";

        protected values = this.value;

        public handleAdd() {
            this.values.push(this.input);
            this.input = "";

            this.handleChange();
        }

        public handleRemove(key: number) {
            this.values.splice(key, 1);

            this.handleChange();
        }

        protected handleChange() {
            const uniqueValues = new Set(this.values.filter((value) => value !== ""));

            this.values = Array.from(uniqueValues.values());

            this.$emit("input", this.values);
        }
    };
</script>
