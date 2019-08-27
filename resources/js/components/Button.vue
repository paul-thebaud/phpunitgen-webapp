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
                    'btn',
                    this.class,
                    { 'btn-rounded': this.rounded },
                    { 'btn-large': this.large },
                    `bg-${this.variant} text-${this.variant}`,
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
    .btn {
        @apply shadow font-bold rounded py-2 px-4;
    }

    .btn:hover {
        opacity: .9;
    }

    .btn-rounded {
        @apply rounded-full;
    }

    .btn-large {
        @apply py-4 px-8;
    }
</style>
