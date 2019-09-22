<template>
    <div class="bg-gradient">
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

                <div class="home-actions">
                    <BButton class="relative mx-2 px-4 py-3 rounded-full"
                             size="lg"
                             :to="{ name: 'home' }">
                        <FontAwesomeIcon class="mr-2" :icon="onlineButtonIcon"></FontAwesomeIcon>
                        {{ $t('home.actions.online') }}
                    </BButton>
                    <BButton class="relative mx-2 px-4 py-3 rounded-full"
                             size="lg"
                             :to="{ name: 'home' }">
                        <FontAwesomeIcon class="mr-2" :icon="documentationButtonIcon"></FontAwesomeIcon>
                        {{ $t('home.actions.documentation') }}
                    </BButton>
                </div>
            </BContainer>
        </div>

        <div class="position-relative">
            <HomeWaves/>
        </div>

        <div class="bg-base">
            <div class="container">
                <HomeFeature v-for="(feature, index) in features"
                             :key="feature"
                             :title="$t(`home.features.${feature}.title`)"
                             :description="$t(`home.features.${feature}.description`)"
                             :image-alt="$t(`home.features.${feature}.image_alt`)"
                             :image="`/img/features/${feature}.jpg`"
                             :reversed="index % 2 === 0"/>
            </div>
        </div>
    </div>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faBook, faRocket } from '@fortawesome/free-solid-svg-icons';
    import HomeWaves from '@/components/home/HomeWaves';
    import HomeFeature from '@/components/home/HomeFeature';

    export default {
        name: 'Home',
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

<style lang="scss" scoped>
    .home-wrapper {
        padding-top: 150px;
        padding-bottom: 10px;

        .home-title {
            font-size: 3rem;
        }

        .home-description {
            font-size: 1.5rem;
        }

        .home-actions {
            margin-top: 40px;
        }
    }
</style>
