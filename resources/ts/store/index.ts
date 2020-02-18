import Vue from "vue";
import Vuex from "vuex";
import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import { container } from "@/container/docContainer";
import { TYPES } from "@/container/types";
import { ThemeI } from "@/container/contracts/themeI";
import { Theme } from "@/container/concerns/theme";

const theme = container.get<ThemeI>(TYPES.Theme);

@Module
class AppModule extends VuexModule {
    public theme = theme.currentTheme;

    @Mutation
    public changeTheme(newTheme: Theme): void {
        this.theme = theme.currentTheme = newTheme;
    }
}

Vue.use(Vuex);

export default new Vuex.Store(AppModule);
