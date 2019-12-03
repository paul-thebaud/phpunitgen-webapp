<template>
  <footer class="p-5">
    <BContainer>
      <BRow class="mb-2">
        <BCol>
          <h4>
            <strong>PhpUnitGen</strong>
          </h4>
        </BCol>
      </BRow>
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
    import { Component, Watch } from "vue-property-decorator";

    @Component({
        components: {
            FooterNavColumn
        }
    })
    export default class FooterNav extends Vue {
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
                        title: this.$t("layout.footer.authors.links.contributors"),
                        href: "https://github.com/paul-thebaud/phpunitgen-core/graphs/contributors",
                    },
                ],
                links: [
                    {
                        title: this.$t("layout.footer.links.links.documentation"),
                        href: "/docs",
                    },
                    {
                        title: this.$t("layout.footer.links.links.support"),
                        href: "https://github.com/paul-thebaud/phpunitgen-core/issues",
                    },
                ],
                legal: [
                    {
                        title: this.$t("layout.footer.legal.links.terms"),
                        href: "/legal",
                    },
                ],
            };
        }
    }
</script>
