<template>
    <div>
        <label :for="id">
            {{ name }}
        </label>
        <BInput type="text"
                :id="id"
                :value="value"
                :placeholder="placeholder"
                :aria-describedby="helpId"
                @input="handleInput"/>
        <BFormText :id="helpId">
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
        computed: {
            helpId() {
                return `${this.id}-help`;
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
