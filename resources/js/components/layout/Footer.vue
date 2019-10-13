<template>
    <footer class="p-5 text-center text-lg-left">
        <BContainer>
            <BRow>
                <FooterLinks v-for="(link, key) in links"
                             :key="key"
                             :title="link.title"
                             :links="link.links"/>
            </BRow>
        </BContainer>
    </footer>
</template>

<script>
    import '@sass/components/layout/footer.scss';
    import FooterLinks from '@/components/layout/FooterLinks';

    export default {
        components: { FooterLinks },
        data() {
            return {
                links: {
                    authors: {
                        title: this.$t('footer.authors.title'),
                        links: [
                            {
                                title: 'Paul Thébaud',
                                href: 'https://github.com/paul-thebaud',
                            },
                            {
                                title: 'Killian Hascoët',
                                href: 'https://github.com/KillianH',
                            },
                            {
                                title: this.$t('footer.authors.links.contributors'),
                                href: 'https://github.com/paul-thebaud/phpunitgen-core/graphs/contributors',
                            },
                        ],
                    },
                    links: {
                        title: this.$t('footer.links.title'),
                        links: [
                            {
                                title: this.$t('footer.links.links.documentation'),
                                href: '/docs',
                            },
                            {
                                title: this.$t('footer.links.links.support'),
                                href: 'https://github.com/paul-thebaud/phpunitgen-core/issues',
                            },
                        ],
                    },
                    legal: {
                        title: this.$t('footer.legal.title'),
                        links: [
                            {
                                title: this.$t('footer.legal.links.terms'),
                                href: '/legal',
                                internal: true,
                            },
                        ],
                    },
                },
            };
        },
    };
</script>
