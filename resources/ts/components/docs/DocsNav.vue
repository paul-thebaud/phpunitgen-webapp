<template>
  <div>
    <nav class="app-nav no-badge">
      <ul>
        <li>
          {{ $t("layout.header.language") }}
          <ul>
            <li
              v-for="(translation, targetLocale) in locales"
              :key="`lang-${targetLocale}`"
              @click.prevent="handleLocaleChange(targetLocale)"
            >
              <a
                href="#"
                :class="currentLocale === targetLocale ? 'active' : ''"
              >
                {{ translation }}
              </a>
            </li>
          </ul>
        </li>
        <li>
          {{ $t("layout.header.theme") }}
          <ul>
            <li
              v-for="targetTheme in unlockedThemes"
              :key="`theme-${targetTheme.getKey()}`"
              @click.prevent="handleThemeChange(targetTheme)"
            >
              <a
                href="#"
                :class="theme === targetTheme ? 'active' : ''"
              >
                {{ targetTheme.getEmoji() }}
                {{ $t(`common.themes.${targetTheme.getKey()}`) }}
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="/">
            <b>{{ $t("layout.header.backToApp") }}</b>
          </a>
        </li>
      </ul>
    </nav>
    <CookiesInfo v-if="cookiesShouldDisplay" />
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { TYPES } from "@/container/types";
    import { Component, Inject, Watch } from "vue-property-decorator";
    import { LocaleI } from "@/container/contracts/localeI";
    import { Theme } from "@/container/concerns/theme";
    import CookiesInfo from "@/components/common/CookiesInfo.vue";
    import { Action, State } from "vuex-class";

    @Component({
        components: {
            CookiesInfo,
        },
    })
    export default class DocsNav extends Vue {
        @Inject(TYPES.Locale)
        protected readonly locale!: LocaleI;

        @State
        protected readonly unlockedThemes!: Theme[];

        @State
        protected readonly theme!: Theme;

        @State
        protected readonly analyticsActivated!: boolean | null;

        @Action
        protected readonly requestThemeChange!: (theme: Theme) => Promise<void>;

        protected locales = this.locale.getLocales();

        protected currentLocale = this.locale.currentLocale;

        protected get cookiesShouldDisplay(): boolean {
            return this.analyticsActivated === null;
        }

        protected async handleThemeChange(newTheme: Theme): Promise<void> {
            await this.requestThemeChange(newTheme);
        }

        protected handleLocaleChange(newLocale: string): void {
            const previousLocale = this.currentLocale;

            this.locale.currentLocale = this.currentLocale = newLocale;

            if (newLocale !== previousLocale) {
                window.location.hash = window.location.hash.replace(/^#\/[a-z]{2}/, `#${newLocale}`);
            }
        }

        @Watch("analyticsActivated")
        protected handleAnalyticsActivatedChange(newValue: boolean, previousValue: boolean): void {
            if (newValue && newValue !== previousValue) {
                // Reload the page to trigger the analytics activation.
                window.location.reload();
            }
        }
    }
</script>
