<template>
    <div class="mt-3">
        <span id="versions-button" class="btn" :class="apiStatusVariant">
            <FontAwesomeIcon :icon="apiStatusIcon"
                             :class="apiStatus === 'connecting' ? 'fa-spin' : ''"></FontAwesomeIcon>
            {{ apiStatusMessage }}
        </span>
        <b-tooltip v-if="apiStatus !== 'connecting'"
                   target="versions-button">
            <div v-if="apiStatus === 'connected'" class="text-left">
                <span v-html="$t('tool.versions.core_version', { version: coreVersion })"></span>
                <br>
                <span v-html="$t('tool.versions.api_version', { version: apiVersion })"></span>
            </div>
            <div v-if="apiStatus === 'disconnected'" class="text-center">
                {{ $t(`tool.versions.api_disconnected_error`) }}
            </div>
        </b-tooltip>
    </div>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faCheckCircle, faCircleNotch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
    import { apiManager } from '@/services';

    export default {
        components: {
            FontAwesomeIcon,
        },
        data() {
            return {
                apiStatus: 'connecting',
                apiVersion: null,
                coreVersion: null,
            };
        },
        async mounted() {
            try {
                const versions = await apiManager.get('/api');

                this.apiStatus = 'connected';
                this.coreVersion = versions.core_version;
                this.apiVersion = versions.api_version;
            } catch (error) {
                this.apiStatus = 'disconnected';
                console.error(error);
            }
        },
        computed: {
            apiStatusVariant() {
                if (this.apiStatus === 'connecting') {
                    return 'btn-warning';
                }

                return this.apiStatus === 'disconnected'
                    ? 'btn-danger'
                    : 'btn-success';
            },
            apiStatusIcon() {
                if (this.apiStatus === 'connecting') {
                    return faCircleNotch;
                }

                return this.apiStatus === 'disconnected'
                    ? faTimesCircle
                    : faCheckCircle;
            },
            apiStatusMessage() {
                return this.$t(`tool.versions.api_${this.apiStatus}`);
            },
        },
    };
</script>
