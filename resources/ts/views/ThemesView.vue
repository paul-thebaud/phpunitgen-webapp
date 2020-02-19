<template>
  <BContainer class="my-5">
    <h1>{{ $t("views.themes.title") }}</h1>
    <p>{{ $t("views.themes.description") }}</p>
    <CardSelect
      id="themes-card-select"
      :values="themesMap"
      :value="theme.getKey()"
      :compute-classes="getThemeCardClass"
      :display-all="true"
      @input="handleThemeChange"
    >
      <template v-slot:value="{ value: targetTheme }">
        <h4 class="mb-0">
          {{ targetTheme.getEmoji() }}
          {{ $t(`common.themes.${targetTheme.getKey()}`) }}
        </h4>
        <small>
          {{ getThemeCardText(targetTheme) }}
        </small>
      </template>
    </CardSelect>
  </BContainer>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Inject } from "vue-property-decorator";
    import { TranslateResult } from "vue-i18n";
    import { Action, State } from "vuex-class";
    import { TYPES } from "@/container/types";
    import { ThemeI } from "@/container/contracts/themeI";
    import { StoreI } from "@/container/contracts/storeI";
    import { Theme } from "@/container/concerns/theme";
    import CardSelect from "@/components/forms/CardSelectField.vue";
    import { Dictionary } from "@/utils/types";

    @Component({
        components: { CardSelect },
    })
    export default class ThemesView extends Vue {
        @Inject(TYPES.Store)
        protected readonly store!: StoreI;

        @Inject(TYPES.Theme)
        protected readonly themeService!: ThemeI;

        @State
        protected readonly unlockedThemes!: Theme[];

        @State
        protected readonly theme!: Theme;

        @Action
        protected readonly requestThemeChange!: (theme: Theme) => Promise<void>;

        protected generationsCount = this.store.getGenerationsCount();

        protected themes = this.themeService.getThemes();

        protected get themesMap(): Dictionary<Theme> {
            const themes = {} as Dictionary<Theme>;

            this.themes.forEach(theme => {
                themes[theme.getKey()] = theme;
            });

            return themes;
        }

        protected themeFromKey(key: string): Theme {
            return this.themesMap[key];
        }

        protected getThemeCardClass(key: string): string {
            const theme = this.themeFromKey(key);
            if (this.unlockedThemes.indexOf(theme) === -1) {
                return "disabled";
            }

            return this.theme === theme ? "active" : "";
        }

        protected getThemeCardText(theme: Theme): TranslateResult {
            if (this.unlockedThemes.indexOf(theme) === -1) {
                return `${this.generationsCount} / ${theme.getGenerationsToUnlock()}`;
            }

            return this.$t("views.themes.unlocked");
        }

        protected async handleThemeChange(newThemeKey: string): Promise<void> {
            await this.requestThemeChange(this.themesMap[newThemeKey]);
        }
    }
</script>
