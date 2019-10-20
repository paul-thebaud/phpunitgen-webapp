<template>
    <div :id="id">
        <label>
            {{ name }}
        </label>
        <BInputGroup class="mb-2">
            <BInput v-model="input"
                    type="text"
                    :placeholder="placeholder"
                    @keyup.enter="handleAdd"/>
            <BInputGroupAppend>
                <BButton variant="primary" @click="handleAdd">
                    <FontAwesomeIcon :icon="icons.faPlus"></FontAwesomeIcon>
                </BButton>
            </BInputGroupAppend>
        </BInputGroup>

        <BInputGroup v-for="(item, key) in values"
                     class="mt-1"
                     :key="`${id}-${key}`">
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
            placeholder: {
                required: true,
                type: String,
            },
            help: {
                required: true,
                type: String,
            },
            value: {
                required: false,
                type: Array,
            },
        },
        data() {
            return {
                input: '',
                values: this.value,
                icons: {
                    faPlus,
                    faTimes,
                },
            };
        },
        methods: {
            handleAdd() {
                this.values.push(this.input);
                this.input = '';

                this.handleChange();
            },
            handleRemove(key) {
                this.values.splice(key, 1);

                this.handleChange();
            },
            handleChange() {
                this.values = [...new Set(this.values.filter((el) => el !== ''))];

                this.$emit('input', this.values);
            },
        },
    };
</script>

<style scoped>

</style>
