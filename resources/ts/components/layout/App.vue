<template>
    <div id="app">
        <Header :themes="unlockedThemes"/>
        <div class="wrapper">
            <RouterView @theme-unlock="handleThemeUnlock"/>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import Header from "@/components/layout/Header.vue";
    import { container } from "@/container/container";
    import { TYPES } from "@/container/types";
    import { ThemeI } from "@/container/contracts/themeI";
    import { Theme } from "@/container/concerns/theme";

    const theme: ThemeI = container.get<ThemeI>(TYPES.Theme);

    @Component({
        components: {
            Header,
        }
    })
    export default class App extends Vue {
        protected unlockedThemes: Theme[] = theme.getUnlockedThemes();

        protected handleThemeUnlock(newTheme: Theme): void {
            const themeName = this.$i18n.t(`common.themes.${newTheme.getKey()}`);
            const toastTitle = `${newTheme.getEmoji()} ${this.$i18n.t("layout.app.themeUnlockToast.title")}`;
            const toastDescription = <string>this.$i18n.t("layout.app.themeUnlockToast.description", {
                theme: themeName
            });

            this.$bvToast.toast(
                toastDescription,
                {
                    title: toastTitle,
                    autoHideDelay: 5000,
                },
            );

            this.unlockedThemes = theme.getUnlockedThemes();
        }
    };
</script>

<style scoped>

</style>
