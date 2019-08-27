<template>
    <div v-if="opened" class="modal-wrapper">
        <div class="modal-overlay"></div>
        <HandleClickOutside :click-outside="close">
            <div class="modal bg-theme text-theme">
                <div class="modal-title">
                    <h1>{{ title }}</h1>
                    <FontAwesomeIcon :icon="closeIcon" @click="close"></FontAwesomeIcon>
                </div>
                <div class="modal-body">
                    <slot name="body"/>
                </div>
                <div class="modal-actions">
                    <slot name="actions"/>
                </div>
            </div>
        </HandleClickOutside>
    </div>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faTimes } from '@fortawesome/free-solid-svg-icons';
    import HandleClickOutside from '@/components/HandleClickOutside';

    export default {
        name: 'Modal',
        props: {
            title: {
                required: true,
                type: String,
            },
            opened: {
                required: false,
                type: Boolean,
                default: true,
            },
        },
        components: {
            HandleClickOutside,
            FontAwesomeIcon,
        },
        mounted() {
            if (this.opened) {
                document.documentElement.style.overflow = 'hidden';
            }
        },
        computed: {
            closeIcon() {
                return faTimes;
            },
        },
        methods: {
            open() {
                document.documentElement.style.overflow = 'hidden';
                this.opened = true;
            },
            close() {
                document.documentElement.style.overflow = 'auto';
                this.opened = false;
            },
        },
    };
</script>

<style scoped>
    .modal-wrapper {
        @apply absolute top-0 left-0 w-screen h-screen flex items-center justify-center;
    }

    .modal-overlay {
        @apply absolute top-0 left-0 w-screen h-screen bg-black opacity-50;
    }

    .modal {
        @apply z-50 rounded-lg p-5 shadow-lg w-11/12;
    }

    .modal-title {
        @apply flex justify-between items-center mb-4;
    }

    .modal-title > h1 {
        @apply text-2xl font-bold;
    }

    .modal-title > svg {
        @apply text-xl cursor-pointer;
    }

    @screen lg {
        .modal {
            @apply w-1/2;
        }
    }
</style>
