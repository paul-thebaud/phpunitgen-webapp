<template>
    <div>
        <span :id="id" class="" :class="variantClass">
            <FontAwesomeIcon :icon="variantIcon"
                             :class="variantIconClass"
                             class="mr-1"></FontAwesomeIcon>
            {{ text }}
        </span>
        <BTooltip v-if="hasToolTip"
                  :target="id">
            <slot></slot>
        </BTooltip>
    </div>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faCheckCircle, faCircleNotch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

    export default {
        components: {
            FontAwesomeIcon,
        },
        props: {
            id: {
                required: true,
                type: String,
            },
            text: {
                required: true,
                type: String,
            },
            variant: {
                required: false,
                validator: function (value) {
                    return ['success', 'warning', 'danger'].indexOf(value) !== -1;
                },
            },
        },
        data() {
            return {
                hasToolTip: !! this.$slots.default,
                icons: {
                    success: faCheckCircle,
                    warning: faCircleNotch,
                    danger: faTimesCircle,
                },
            };
        },
        watch: {
            variant() {
                this.hasToolTip = !! this.$slots.default;
            },
        },
        computed: {
            variantClass() {
                return `text-${this.variant}`;
            },
            variantIcon() {
                return this.icons[this.variant];
            },
            variantIconClass() {
                return this.variant === 'warning' ? 'fa-spin' : '';
            },
        },
    };
</script>

<style scoped>

</style>
