<template>
    <footer class="bg-gradient pt-3 pb-1 text-center text-lg-right">
        <b-container>
            <b-row>
                <b-col md>
                    <p class="text-uppercase font-weight-bold">
                        {{ $t('footer.legal.title') }}
                    </p>
                    <ul>
                        <li>
                            <b-link href="#">
                                {{ $t('footer.legal.links.terms') }}
                            </b-link>
                        </li>
                    </ul>
                </b-col>
                <b-col md>
                    <p class="text-uppercase font-weight-bold">
                        {{ $t('footer.links.title') }}
                    </p>
                    <ul>
                        <li>
                            <b-link href="#">
                                {{ $t('footer.links.links.documentation') }}
                            </b-link>
                        </li>
                        <li>
                            <b-link href="#">
                                {{ $t('footer.links.links.support') }}
                            </b-link>
                        </li>
                    </ul>
                </b-col>
                <b-col md>
                    <p class="text-uppercase font-weight-bold">
                        {{ $t('footer.authors.title') }}
                    </p>
                    <ul>
                        <li>
                            <b-link href="#">
                                Paul Thébaud
                            </b-link>
                        </li>
                        <li>
                            <b-link href="#">
                                Killian Hascoët
                            </b-link>
                        </li>
                        <li>
                            <b-link href="#">
                                {{ $t('footer.authors.links.contributors') }}
                            </b-link>
                        </li>
                    </ul>
                </b-col>
            </b-row>
        </b-container>
    </footer>
</template>

<script>
    export default {
        name: 'Footer',
        data() {
            return {
                theme: 'light',
                language: 'english',
            };
        },
    };
</script>

<style lang="scss" scoped>
    footer {
        margin-top: auto;
        width: 100%;

        ul {
            list-style: none;
            padding-left: 0;
        }

        a, .btn-link {
            color: inherit;
        }
    }
</style>
