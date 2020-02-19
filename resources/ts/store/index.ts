import Vue from "vue";
import Vuex from "vuex";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { container } from "@/container/docContainer";
import { TYPES } from "@/container/types";
import { ThemeI } from "@/container/contracts/themeI";
import { StoreI } from "@/container/contracts/storeI";
import { Theme } from "@/container/concerns/theme";

const theme = container.get<ThemeI>(TYPES.Theme);
const store = container.get<StoreI>(TYPES.Store);

@Module
class AppModule extends VuexModule {
    public theme = theme.currentTheme;

    public unlockedThemes = theme.getUnlockedThemes();

    @Mutation
    public changeTheme(newTheme: Theme): void {
        this.theme = theme.currentTheme = newTheme;
    }

    @Mutation
    public unlockTheme(newTheme: Theme): void {
        this.unlockedThemes.push(newTheme);
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
}

Vue.use(Vuex);

export default new Vuex.Store(AppModule);
