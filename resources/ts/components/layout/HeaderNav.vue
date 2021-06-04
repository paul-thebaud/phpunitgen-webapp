<template>
  <BNavbar
    v-on-click-away="handleCloseNavIfNeeded"
    class="position-fixed fixed-top"
    toggleable="lg"
    :class="{ extended, shadow: ! extended }"
    type=""
  >
    <BContainer>
      <BNavbarBrand
        :to="{ name: 'home' }"
        :aria-label="$t('layout.header.home')"
        @click="handleCloseNavIfNeeded"
      >
        <PhpUnitGenLogo />
      </BNavbarBrand>

      <BButton
        v-b-toggle.nav-collapse
        class="d-lg-none rounded-full"
        :aria-label="$t('layout.header.menu')"
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
              v-for="targetTheme in unlockedThemes"
              :key="`theme-${targetTheme.getKey()}`"
              :active="theme.getKey() === targetTheme.getKey()"
              link-class="d-flex align-items-center"
              @click="handleThemeChange(targetTheme)"
            >
              <span class="mr-2">
                {{ targetTheme.getEmoji() }}
              </span>
              {{ $t(`common.themes.${targetTheme.getKey()}`) }}
              <FontAwesomeIcon
                v-if="targetTheme.hasAccessibleColors()"
                v-b-tooltip="{ title: $t('common.themes.accessibility'), interactive: false }"
                class="ml-auto"
                icon="eye"
              />
            </BDropdownItem>
            <BDropdownItem :to="{ name: 'themes' }">
              {{ $t(`layout.header.viewAll`) }}
            </BDropdownItem>
          </BNavItemDropdown>
        </BNavbarNav>
        <BButton
          :to="{ name: 'tool' }"
          class="mt-2 mt-lg-0 px-4 py-2"
          @click="handleCloseNavIfNeeded"
        >
          {{ $t("layout.header.useOnline") }}
        </BButton>
      </BCollapse>
    </BContainer>
  </BNavbar>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Inject, Watch } from "vue-property-decorator";
    import { Action, State } from "vuex-class";
    import { directive as onClickAway } from "vue-clickaway";
    import { TYPES } from "@/container/types";
    import { LocaleI } from "@/container/contracts/localeI";
    import { Theme } from "@/container/concerns/theme";
    import PhpUnitGenLogo from "@/components/common/PhpUnitGenLogo.vue";

    Vue.directive("on-click-away", onClickAway);

    @Component({
        components: {
            PhpUnitGenLogo,
        },
    })
    export default class HeaderNav extends Vue {
        public readonly $refs!: {
            navCollapse: Vue;
        };

        @Inject(TYPES.Locale)
        protected readonly locale!: LocaleI;

        @State
        protected readonly unlockedThemes!: Theme[];

        @State
        protected readonly theme!: Theme;

        @Action
        protected readonly requestThemeChange!: (theme: Theme) => Promise<void>;

        protected locales = this.locale.getLocales();

        protected currentLocale = this.locale.currentLocale;

        protected extended = true;

        protected created(): void {
            window.addEventListener("scroll", this.handleScrollOrRouteChange);

            this.$nextTick(function () {
                this.handleScrollOrRouteChange();
            });
        }

        protected beforeDestroy(): void {
            window.removeEventListener("scroll", this.handleScrollOrRouteChange);
        }

        protected async handleThemeChange(newTheme: Theme): Promise<void> {
            await this.requestThemeChange(newTheme);
        }

        protected handleLocaleChange(newLocale: string): void {
            this.locale.currentLocale = this.currentLocale = newLocale;
        }

        protected handleCloseNavIfNeeded(): void {
            if (window.getComputedStyle(this.$refs.navCollapse.$el).display === "block") {
                this.$root.$emit("bv::toggle::collapse", "nav-collapse");
            }
        }

        @Watch("$route")
        protected handleScrollOrRouteChange(): void {
            this.extended = this.$route.name === "home" && window.pageYOffset < 50;
        }
    }
</script>
