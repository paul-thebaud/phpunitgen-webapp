<template>
    <div :id="id">
        <label>
            {{ name }}
        </label>
        <BInput type="text"
                :value="value"
                :placeholder="placeholder"
                @input="handleInput"/>
        <BFormText>
            {{ help }}
        </BFormText>
    </div>
</template>

<script>
    export default {
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
                type: String,
            },
        },
        methods: {
            handleInput(value) {
                this.$emit('input', value);
            },
        },
    };
</script>

<style scoped>

</style>
