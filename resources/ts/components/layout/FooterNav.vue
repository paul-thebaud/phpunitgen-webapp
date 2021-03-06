<template>
  <footer class="py-5">
    <BContainer>
      <PhpUnitGenLogo class="mb-2" />
      <p class="small">
        {{ $t("layout.footer.versions", versions) }}
        <br>
        {{ $t("layout.footer.buildDateTime", { buildDateTime }) }}
      </p>
      <BRow>
        <FooterNavColumn
          v-for="(linksList, key) in links"
          :key="key"
          :name="key"
          :links="linksList"
        />
      </BRow>
    </BContainer>
  </footer>
</template>

<script lang="ts">
    import Vue from "vue";
    import FooterNavColumn from "@/components/layout/FooterNavColumn.vue";
    import { Component, Inject, Watch } from "vue-property-decorator";
    import { LocaleI } from "@/container/contracts/localeI";
    import { TYPES } from "@/container/types";
    import PhpUnitGenLogo from "@/components/common/PhpUnitGenLogo.vue";

    declare const PHPUNITGEN_VERSIONS: {
        core: string;
        web: string;
    };

    @Component({
        components: {
            FooterNavColumn,
            PhpUnitGenLogo,
        },
    })
    export default class FooterNav extends Vue {
        @Inject(TYPES.Locale)
        protected readonly locale!: LocaleI;

        protected versions = { ...PHPUNITGEN_VERSIONS };

        protected buildDateTime = process.env.BUILD_DATETIME;

        protected links = {};

        protected mounted(): void {
            this.createLinks();
        }

        @Watch("$i18n.locale")
        protected onLocaleChange(): void {
            this.createLinks();
        }

        protected createLinks(): void {
            this.links = {
                authors: [
                    {
                        title: "Paul Thébaud",
                        href: "https://github.com/paul-thebaud",
                    },
                    {
                        title: "Killian Hascoët",
                        href: "https://github.com/KillianH",
                    },
                    {
                        title: "Charles Corbel",
                        href: "https://dribbble.com/CorbelC",
                    },
                    {
                        title: this.$t("layout.footer.authors.links.contributors"),
                        href: "https://github.com/paul-thebaud/phpunitgen-core/graphs/contributors",
                    },
                ],
                links: [
                    {
                        title: this.$t("layout.footer.links.links.documentation"),
                        href: this.locale.localizedDocs(),
                    },
                    {
                        title: this.$t("layout.footer.links.links.support"),
                        href: "https://github.com/paul-thebaud/phpunitgen-core/issues",
                    },
                ],
                legal: [
                    {
                        title: this.$t("layout.footer.legal.links.cookies"),
                        href: { name: "cookies" },
                    },
                    {
                        title: this.$t("layout.footer.legal.links.terms"),
                        href: { name: "legal" },
                    },
                ],
            };
        }
    }
</script>
