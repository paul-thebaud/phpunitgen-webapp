import Vue from "vue";
import Vuex from "vuex";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { container } from "@/container/docContainer";
import { TYPES } from "@/container/types";
import { ThemeI } from "@/container/contracts/themeI";
import { StoreI } from "@/container/contracts/storeI";
import { GoogleAnalyticsI } from "@/container/contracts/googleAnalyticsI";
import { Theme } from "@/container/concerns/theme";

const theme = container.get<ThemeI>(TYPES.Theme);
const store = container.get<StoreI>(TYPES.Store);
const googleAnalytics = container.get<GoogleAnalyticsI>(TYPES.GoogleAnalytics);

@Module
class AppModule extends VuexModule {
    public theme = theme.currentTheme;

    public unlockedThemes = theme.getUnlockedThemes();

    public analyticsActivated: boolean | null = googleAnalytics.isChecked()
        ? googleAnalytics.isAccepted()
        : null;

    @Mutation
    public changeTheme(newTheme: Theme): void {
        this.theme = theme.currentTheme = newTheme;
    }

    @Mutation
    public unlockTheme(newTheme: Theme): void {
        this.unlockedThemes.push(newTheme);
    }

    @Mutation
    public changeAnalytics(active: boolean): void {
        this.analyticsActivated = active;

        if (this.analyticsActivated) {
            googleAnalytics.accept();
        } else {
            googleAnalytics.refuse();
        }
    }

    @Action
    public async requestThemeChange(newTheme: Theme): Promise<void> {
        if (theme.isUnlocked(newTheme)) {
            this.context.commit("changeTheme", newTheme);
        }
    }

    @Action
    public async requestThemeUnlock(newTheme: Theme): Promise<boolean> {
        if (store.getGenerationsCount() === newTheme.getGenerationsToUnlock()) {
            this.context.commit("unlockTheme", newTheme);

            return true;
        }

        return false;
    }

    @Action
    public async initAnalytics(): Promise<void> {
        if (googleAnalytics.isConfigured() || this.analyticsActivated === true) {
            googleAnalytics.activate();
        }
    }

    @Action
    public async requestAnalyticsChange(newActive: boolean): Promise<void> {
        if (! googleAnalytics.isConfigured() || this.analyticsActivated === newActive) {
            return;
        }

        this.context.commit("changeAnalytics", newActive);
    }
}

Vue.use(Vuex);

export default new Vuex.Store(AppModule);
