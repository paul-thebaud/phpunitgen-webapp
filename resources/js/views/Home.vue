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
                        <BButton class="px-4 py-3 rounded-pill"
                                 size="lg"
                                 :to="{ name: 'tool' }">
                            <FontAwesomeIcon class="mr-2" :icon="icons.faRocket"></FontAwesomeIcon>
                            {{ $t('home.actions.online') }}
                        </BButton>
                    </BCol>
                    <BCol md class="px-1 text-md-left mt-2 mt-md-0">
                        <BButton class="px-4 py-3 rounded-pill"
                                 size="lg"
                                 href="/docs#/">
                            <FontAwesomeIcon class="mr-2" :icon="icons.faBook"></FontAwesomeIcon>
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
                <h2 class="pt-5 text-center">
                    Plusieurs plateformes pour tous les usages
                </h2>

                <BRow class="pt-3 pb-5">
                    <BCol class="my-2" lg>
                        <BCard class="h-100" body-class="d-flex justify-content-between flex-column">
                            <BCardTitle class="mb-4">
                                Ligne de commande
                            </BCardTitle>

                            <BCardText>
                                Utilisez PhpUnitGen en ligne de commande pour vos projets.
                                Installez-le sur une application Laravel pour avoir une génération de tests automatique
                                quand vous appelez la commande "make" !
                            </BCardText>

                            <BCardText class="text-right mt-2">
                                <b-link href="/" class="py-2 px-4 rounded"
                                        style="background-color: var(--base-bg-color); color: var(--base-color)">
                                    Lire la documentation
                                </b-link>
                            </BCardText>
                        </BCard>
                    </BCol>
                    <BCol class="my-2" lg>
                        <BCard class="h-100" body-class="d-flex justify-content-between flex-column">
                            <BCardTitle>
                                Application Web
                            </BCardTitle>

                            <BCardText>
                                PhpUnitGen vous offre aussi un accès à ses fonctionnalités sur le Web !
                                Vous pouvez configurer et utiliser l'outil directement sur l'application web, c'est
                                rapide et simple.
                            </BCardText>

                            <BCardText class="text-right mt-2">
                                <b-link href="/" class="py-2 px-4 rounded"
                                        style="background-color: var(--base-bg-color); color: var(--base-color)">
                                    Utiliser en ligne
                                </b-link>
                            </BCardText>
                        </BCard>
                    </BCol>
                    <BCol class="my-2" lg>
                        <BCard class="h-100" body-class="d-flex justify-content-between flex-column">
                            <BCardTitle>
                                API
                            </BCardTitle>

                            <BCardText>
                                Vous voulez utiliser l'outil depuis votre application sans installer la paquet ?
                                Aucun problème, il y a une API ouverte et totalement documentée.
                            </BCardText>

                            <BCardText class="text-right mt-2">
                                <b-link href="/" class="py-2 px-4 rounded"
                                        style="background-color: var(--base-bg-color); color: var(--base-color)">
                                    Lire la documentation
                                </b-link>
                            </BCardText>
                        </BCard>
                    </BCol>
                </BRow>

                <BRow class="pt-3 pb-5">
                    <BCol class="text-right">
                        <img src="https://fakeimg.pl/500x250/" class="rounded-lg"/>
                    </BCol>
                    <BCol class="d-flex flex-column justify-content-center">
                        <h3>Une documentation complète</h3>
                        <p>
                            Le fonctionnement de PhpUnitGen ainsi que chacune de ses fonctionnalités, de la
                            configuration à la surchage de certaines parties de l'outil, sont documentés avec soin.
                            <br>
                            <br>
                            Tout cela disponible en anglais ou en français.
                        </p>
                    </BCol>
                </BRow>

                <BRow class="pt-3 pb-5">
                    <BCol class="d-flex flex-column justify-content-center text-right">
                        <h3>De la modularité</h3>
                        <p>
                            Depuis la toute première version, <code>phpunit-generator</code>, nous avons pris soin de
                            rendre l'outil
                            le plus modulaire possible, afin que chacun puisse générer des tests à son image.
                            <br>
                            <br>
                            Actuellement, PhpUnitGen dispose de X générateurs de tests différents, n'hésitez pas à nous
                            en proposer de nouveaux !
                        </p>
                    </BCol>
                    <BCol>
                        <img src="https://fakeimg.pl/500x250/" class="rounded"/>
                    </BCol>
                </BRow>

                <BContainer>
                    <BRow class="pt-3 pb-5">
                        <BCol class="text-center">
                            <h3>Prêt à générer des tests ?</h3>
                            <p>
                                Lancez-vous maintenant, que ce soit via l'application Web ou l'outil en ligne de
                                commande !
                            </p>
                            <div>
                                <BButton variant="primary"
                                         :to="{ name: 'tool' }">
                                    Essayer l'outil en ligne
                                </BButton>
                                <BButton class="ml-2" variant="secondary"
                                         href="/docs#/">
                                    Lire la documenation
                                </BButton>
                            </div>
                        </BCol>
                    </BRow>
                </BContainer>
            </BContainer>
        </div>

        <!--
        <div class="home-features">
            <BContainer>
                <HomeFeature v-for="(feature, index) in features"
                             :key="feature"
                             :title="$t(`home.features.${feature}.title`)"
                             :description="$t(`home.features.${feature}.description`)"
                             :image-alt="$t(`home.features.${feature}.image_alt`)"
                             :image="`/img/features/console.jpg`"
                             :reversed="index % 2 === 0"/>
            </BContainer>
        </div>
        -->
    </div>
</template>

<script>
    import '@sass/views/home.scss';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faBook, faLongArrowAltRight, faRocket, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
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
                icons: {
                    faRocket,
                    faBook,
                    faTachometerAlt,
                    faLongArrowAltRight,
                },
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
