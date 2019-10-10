<template>
    <StateIndicator id="versions-button" class="mt-3" :variant="apiStatusVariant" :text="apiStatusMessage">
        <div v-if="apiStatus !== 'connecting'">
            <div v-if="apiStatus === 'connected'" class="text-left">
                <span v-html="$t('tool.versions.core_version', { version: coreVersion })"></span>
                <br>
                <span v-html="$t('tool.versions.api_version', { version: apiVersion })"></span>
            </div>
            <div v-if="apiStatus === 'disconnected'" class="text-center">
                {{ $t(`tool.versions.api_disconnected_error`) }}
            </div>
        </div>
    </StateIndicator>
</template>

<script>
    import { api } from '@/services';
    import StateIndicator from '@/components/tool/StateIndicator';

    export default {
        components: {
            StateIndicator,
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
                const versions = await api.get('/api');

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
                    return 'warning';
                }

                return this.apiStatus === 'disconnected'
                    ? 'danger'
                    : 'success';
            },
            apiStatusMessage() {
                return this.$t(`tool.versions.api_${this.apiStatus}`);
            },
        },
    };
</script>
