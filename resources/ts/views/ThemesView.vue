<template>
    <BContainer class="my-5">
        <h1>{{ $t("views.themes.title") }}</h1>
        <p>{{ $t("views.themes.description") }}</p>
        <BRow>
            <BCol v-for="targetTheme in themes"
                  :key="targetTheme.getKey()"
                  class="theme-wrapper pb-4"
                  sm="6"
                  md="4"
                  lg="3">
                <BCard @click="handleThemeChange(targetTheme)"
                       :class="getThemeCardClass(targetTheme)"
                       class="text-center">
                    <h4 class="mb-0">
                        {{ targetTheme.getEmoji() }}
                        {{ $t(`common.themes.${targetTheme.getKey()}`) }}
                    </h4>
                    <small>
                        {{ getThemeCardText(targetTheme) }}
                    </small>
                </BCard>
            </BCol>
        </BRow>
    </BContainer>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Inject, Prop } from "vue-property-decorator";
    import { TYPES } from "@/container/types";
    import { ThemeI } from "@/container/contracts/themeI";
    import { StoreI } from "@/container/contracts/storeI";
    import { Theme } from "@/container/concerns/theme";

    @Component
    export default class ThemesView extends Vue {
        @Inject(TYPES.Store)
        protected store!: StoreI;

        @Inject(TYPES.Theme)
        protected theme!: ThemeI;

        @Prop(Object)
        protected currentTheme!: Theme;

        protected generationsCount = this.store.getGenerationsCount();

        protected themes = this.theme.getThemes();

        protected getThemeCardClass(theme: Theme): string {
            return theme.getGenerationsToUnlock() > this.generationsCount
                ? "theme-locked"
                : (theme === this.currentTheme ? "active" : "");
        }

        protected getThemeCardText(theme: Theme) {
            return theme.getGenerationsToUnlock() > this.generationsCount
                ? `${this.generationsCount} / ${theme.getGenerationsToUnlock()}`
                : this.$t("views.themes.unlocked");
        }

        protected handleThemeChange(newTheme: Theme): void {
            this.$emit("theme-change", newTheme);
        }
    };
</script>
