<template>
  <BNavbar
    v-on-click-away="handleClickAway"
    toggleable="lg"
    fixed="top"
    class="shadow"
    type=""
  >
    <BContainer>
      <BNavbarBrand
        v-b-toggle.nav-collapse
        :to="{ name: 'home' }"
      >
        <strong>PhpUnitGen</strong>
      </BNavbarBrand>

      <BButton
        v-b-toggle.nav-collapse
        class="d-lg-none rounded-full"
      >
        <FontAwesomeIcon
          class="when-closed"
          icon="bars"
        />
        <FontAwesomeIcon
          class="when-opened"
          icon="times"
        />
      </BButton>

      <BCollapse
        id="nav-collapse"
        ref="navCollapse"
        is-nav
      >
        <BNavbarNav class="ml-auto">
          <BNavItem
            :href="locale.localizedDocs()"
            class="mr-lg-2"
          >
            {{ $t("layout.header.documentation") }}
          </BNavItem>

          <BNavItemDropdown
            class="mr-lg-2"
            :text="$t('layout.header.language')"
            right
          >
            <BDropdownItem
              v-for="(translation, targetLocale) in locales"
              :key="`lang-${targetLocale}`"
              :active="currentLocale === targetLocale"
              @click="handleLocaleChange(targetLocale)"
            >
              {{ translation }}
            </BDropdownItem>
          </BNavItemDropdown>

          <BNavItemDropdown
            class="mr-lg-2"
            :text="$t('layout.header.theme')"
            right
          >
            <BDropdownItem
              v-for="targetTheme in themes"
              :key="`theme-${targetTheme.getKey()}`"
              :active="currentTheme.getKey() === targetTheme.getKey()"
              @click="handleThemeChange(targetTheme)"
            >
              {{ targetTheme.getEmoji() }}
              {{ $t(`common.themes.${targetTheme.getKey()}`) }}
            </BDropdownItem>
          </BNavItemDropdown>

          <BButton
            v-b-toggle.nav-collapse
            :to="{ name: 'tool' }"
            class="mt-2 mt-lg-0 rounded-pill px-4 py-2"
          >
            {{ $t("layout.header.useOnline") }}
          </BButton>
        </BNavbarNav>
      </BCollapse>
    </BContainer>
  </BNavbar>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Inject, Prop } from "vue-property-decorator";
    import { directive as onClickAway } from "vue-clickaway";
    import { TYPES } from "@/container/types";
    import { ThemeI } from "@/container/contracts/themeI";
    import { LocaleI } from "@/container/contracts/localeI";
    import { Theme } from "@/container/concerns/theme";

    Vue.directive("on-click-away", onClickAway);

    @Component
    export default class HeaderNav extends Vue {
        public $refs!: {
            navCollapse: HTMLElement;
        };

        @Inject(TYPES.Theme)
        protected theme!: ThemeI;

        @Inject(TYPES.Locale)
        protected locale!: LocaleI;

        @Prop(Array)
        protected readonly themes!: Theme[];

        @Prop(Object)
        protected currentTheme!: Theme;

        protected locales = this.locale.getLocales();

        protected currentLocale = this.locale.currentLocale;

        protected handleThemeChange(newTheme: Theme): void {
            this.$emit("theme-change", newTheme);
        }

        protected handleLocaleChange(newLocale: string): void {
            this.locale.currentLocale = this.currentLocale = newLocale;
        }

        protected handleClickAway(): void {
            if (this.$refs.navCollapse.offsetParent !== null) {
                this.$root.$emit("bv::toggle::collapse", "nav-collapse");
            }
        }
    }
</script>
