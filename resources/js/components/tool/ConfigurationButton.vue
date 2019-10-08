<template>
    <BButton variant="primary" :to="{ name: 'configuration' }" :disabled="disabled">
        <FontAwesomeIcon :icon="icons.faCog"></FontAwesomeIcon>
        {{ $t('tool.editor.actions.configure') }}
    </BButton>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faCog } from '@fortawesome/free-solid-svg-icons';

    export default {
        components: {
            FontAwesomeIcon,
        },
        props: {
            disabled: {
                required: false,
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                icons: {
                    faCog,
                },
            };
        },
    };
</script>

<style scoped>

</style>
