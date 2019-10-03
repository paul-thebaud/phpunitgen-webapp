<template>
    <footer class="bg-gradient pt-3 pb-1 text-center text-lg-right">
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
                    legal: {
                        title: this.$t('footer.legal.title'),
                        links: [
                            {
                                title: this.$t('footer.legal.links.terms'),
                                href: '#',
                            },
                        ],
                    },
                    links: {
                        title: this.$t('footer.links.title'),
                        links: [
                            {
                                title: this.$t('footer.links.links.documentation'),
                                href: 'https://phpunitgen.io/docs',
                            },
                            {
                                title: this.$t('footer.links.links.support'),
                                href: 'https://github.com/paul-thebaud/phpunitgen-core/issues',
                            },
                        ],
                    },
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
                },
            };
        },
    };
</script>
