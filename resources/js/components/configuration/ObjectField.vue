<template>
    <div :id="id">
        <label>
            {{ name }}
        </label>
        <BInputGroup class="mb-2">
            <BInput v-model="inputKey"
                    type="text"
                    :placeholder="placeholderKey"
                    @keyup.enter="handleAdd"/>
            <BInput v-model="inputValue"
                    type="text"
                    :placeholder="placeholderValue"
                    @keyup.enter="handleAdd"/>
            <BInputGroupAppend>
                <BButton variant="primary" @click="handleAdd">
                    <FontAwesomeIcon :icon="icons.faPlus"></FontAwesomeIcon>
                </BButton>
            </BInputGroupAppend>
        </BInputGroup>

        <BInputGroup v-for="(value, key) in values"
                     class="mt-1"
                     :key="`${id}-${key}`">
            <BInputGroupPrepend>
                <BInputGroupText>
                    <code>{{ key }}</code>
                </BInputGroupText>
            </BInputGroupPrepend>
            <BInput type="text"
                    v-model="values[key]"
                    @input="handleChange"/>
            <BInputGroupAppend>
                <BButton variant="secondary" @click="handleRemove(key)">
                    <FontAwesomeIcon :icon="icons.faTimes"></FontAwesomeIcon>
                </BButton>
            </BInputGroupAppend>
        </BInputGroup>

        <BFormText>
            {{ help }}
        </BFormText>
    </div>
</template>

<script>
    import '@sass/components/configuration/array-field.scss';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

    export default {
        components: {
            FontAwesomeIcon,
        },
        props: {
            id: {
                required: true,
                type: String,
            },
            name: {
                required: true,
                type: String,
            },
            placeholderKey: {
                required: true,
                type: String,
            },
            placeholderValue: {
                required: true,
                type: String,
            },
            help: {
                required: true,
                type: String,
            },
            value: {
                required: false,
                type: Object,
            },
        },
        data() {
            return {
                inputKey: '',
                inputValue: '',
                values: this.value,
                icons: {
                    faPlus,
                    faTimes,
                },
            };
        },
        methods: {
            handleAdd() {
                this.$set(this.values, this.inputKey, this.inputValue);
                this.inputKey = '';
                this.inputValue = '';

                this.handleChange();
            },
            handleRemove(key) {
                this.$delete(this.values, key);

                this.handleChange();
            },
            handleChange() {
                for (const key in this.values) {
                    if (this.values.hasOwnProperty(key) && this.values[key] === '') {
                        this.$set(this.values, key, null);
                    }
                }

                this.$emit('input', this.values);
            },
        },
    };
</script>

<style scoped>

</style>
