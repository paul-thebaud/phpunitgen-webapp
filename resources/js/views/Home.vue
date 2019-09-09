<template>
    <div class="bg-gradient">
        <div class="home-wrapper">
            <b-container class="text-center">
                <div class="home-title">
                    {{ $t('home.welcome.title') }}
                </div>

                <div class="home-description">
                    {{ $t('home.welcome.description') }}
                </div>

                <div class="home-actions">
                    <b-button class="relative mx-2 px-4 py-3 rounded-full"
                              size="lg"
                              :to="{ name: 'home' }">
                        Use Online
                    </b-button>
                    <b-button class="relative mx-2 px-4 py-3 rounded-full"
                              size="lg"
                              :to="{ name: 'home' }">
                        Documentation
                    </b-button>
                </div>
            </b-container>
        </div>

        <div class="position-relative">
            <HomeWaves/>
        </div>

        <div class="bg-base">
            <div class="container">
                <HomeFeature title="Console Toolkit"/>

                <HomeFeature title="Opened API" reversed/>

                <HomeFeature title="Modularity"/>

                <HomeFeature title="Fully Documented" reversed/>
            </div>
        </div>
    </div>
</template>

<script>
    import HomeWaves from '@/components/home/HomeWaves';
    import HomeFeature from '@/components/home/HomeFeature';

    export default {
        name: 'Home',
        components: { HomeWaves, HomeFeature },
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
