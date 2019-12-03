<template>
  <BContainer class="my-5">
    <h1>{{ $t("views.themes.title") }}</h1>
    <p>{{ $t("views.themes.description") }}</p>
    <CardSelect
      id="themes-card-select"
      :values="themesMap"
      :value="currentTheme.getKey()"
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
    import { Component, Inject, Prop } from "vue-property-decorator";
    import { TYPES } from "@/container/types";
    import { ThemeI } from "@/container/contracts/themeI";
    import { StoreI } from "@/container/contracts/storeI";
    import { Theme } from "@/container/concerns/theme";
    import CardSelect from "@/components/forms/CardSelectField.vue";
    import { Dictionary } from "@/utils/types";
    import { TranslateResult } from "vue-i18n";

    @Component({
        components: { CardSelect }
    })
    export default class ThemesView extends Vue {
        @Inject(TYPES.Store)
        protected store!: StoreI;

        @Inject(TYPES.Theme)
        protected theme!: ThemeI;

        @Prop(Object)
        protected currentTheme!: Theme;

        protected generationsCount = this.store.getGenerationsCount();

        protected themes = this.theme.getThemes();

        protected get themesMap(): Dictionary<Theme> {
            const themes = {} as Dictionary<Theme>;

            this.themes.forEach(theme => {
                themes[theme.getKey()] = theme;
            });

            return themes;
        }

        protected getThemeCardClass(themeKey: string): string {
            const theme = this.themesMap[themeKey];

            return theme.getGenerationsToUnlock() > this.generationsCount
                ? "disabled"
                : (theme === this.currentTheme ? "active" : "");
        }

        protected getThemeCardText(theme: Theme): TranslateResult {
            return theme.getGenerationsToUnlock() > this.generationsCount
                ? `${this.generationsCount} / ${theme.getGenerationsToUnlock()}`
                : this.$t("views.themes.unlocked");
        }

        protected handleThemeChange(newThemeKey: string): void {
            this.$emit("theme-change", this.themesMap[newThemeKey]);
        }
    }
</script>
