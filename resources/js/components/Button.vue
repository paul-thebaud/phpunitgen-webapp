<template>
    <component
            :is="this.type"
            :to="this.to"
            :class="this.classObject"
            @click="clickCallback($event)"
    >
        <slot/>
    </component>
</template>

<script>
    export default {
        name: 'Button',
        props: {
            to: {
                required: false,
            },
            rounded: {
                required: false,
                type: Boolean,
                default: false,
            },
            large: {
                required: false,
                type: Boolean,
                default: false,
            },
            variant: {
                required: false,
                default: 'primary',
                validator: function (value) {
                    return ['primary', 'secondary'].indexOf(value) !== -1;
                },
            },
        },
        computed: {
            type() {
                if (this.to) {
                    return 'RouterLink';
                }

                return 'button';
            },
            classObject() {
                return [
                    this.class,
                    { 'rounded-full': this.rounded },
                    { 'rounded': ! this.rounded },
                    { 'py-4 px-8': this.large },
                    { 'py-2 px-4': ! this.large },
                    `bg-${this.variant} text-${this.variant}`,
                    'btn transition shadow font-bold',
                ];
            },
        },
        methods: {
            clickCallback(event) {
                this.$emit('click', event);
            },
        },
    };
</script>

<style scoped>
    .btn:hover {
        opacity: .9;
    }
</style>
