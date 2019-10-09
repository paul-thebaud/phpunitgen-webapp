<template>
    <div class="home-container">
        <div class="home-wrapper">
            <BContainer class="text-center">
                <div class="home-title">
                    {{ $t('home.welcome.title') }}
                </div>

                <div class="home-description">
                    {{ $t('home.welcome.description') }}
                    <br>
                    {{ $t('home.welcome.open-source') }}
                </div>

                <BRow class="home-actions">
                    <BCol md class="px-1 text-md-right">
                        <BButton class="px-4 py-3 rounded-full"
                                 size="lg"
                                 :to="{ name: 'tool' }">
                            <FontAwesomeIcon class="mr-2" :icon="onlineButtonIcon"></FontAwesomeIcon>
                            {{ $t('home.actions.online') }}
                        </BButton>
                    </BCol>
                    <BCol md class="px-1 text-md-left mt-2 mt-md-0">
                        <BButton class="px-4 py-3 rounded-full"
                                 size="lg"
                                 href="/docs#/">
                            <FontAwesomeIcon class="mr-2" :icon="documentationButtonIcon"></FontAwesomeIcon>
                            {{ $t('home.actions.documentation') }}
                        </BButton>
                    </BCol>
                </BRow>
            </BContainer>
        </div>

        <div class="position-relative">
            <HomeWaves/>
        </div>

        <div class="home-features">
            <BContainer>
                <HomeFeature v-for="(feature, index) in features"
                             :key="feature"
                             :title="$t(`home.features.${feature}.title`)"
                             :description="$t(`home.features.${feature}.description`)"
                             :image-alt="$t(`home.features.${feature}.image_alt`)"
                             :image="`/img/features/${feature}.jpg`"
                             :reversed="index % 2 === 0"/>
            </BContainer>
        </div>
    </div>
</template>

<script>
    import '@sass/views/home.scss';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faBook, faRocket } from '@fortawesome/free-solid-svg-icons';
    import HomeWaves from '@/components/home/HomeWaves';
    import HomeFeature from '@/components/home/HomeFeature';

    export default {
        components: {
            FontAwesomeIcon,
            HomeWaves,
            HomeFeature,
        },
        data() {
            return {
                onlineButtonIcon: faRocket,
                documentationButtonIcon: faBook,
                features: [
                    'console',
                    'webapp',
                    'api',
                    'modularity',
                    'documentation',
                ],
            };
        },
    };
</script>
