<template>
  <BContainer class="my-5">
    <BRow>
      <BCol
        cols="12"
        class="d-flex align-items-center justify-content-end mb-4"
      >
        <div class="text-right mr-3">
          <h5>
            {{ $t("views.tool.nextUnlock") }}
          </h5>
          <p class="mb-0">
            {{ nextUnlockedTheme ? $t("views.tool.unlockThemes") : $t("views.tool.allThemesUnlocked") }}
            <br>
            <RouterLink :to="{ name: 'themes' }">
              {{ $t("views.tool.themeListLink") }}
            </RouterLink>
          </p>
        </div>
        <RouterLink :to="{ name: 'themes' }">
          <RadialProgress
            start-color="var(--gradient-start-color)"
            stop-color="var(--gradient-stop-color)"
            inner-stroke-color="var(--secondary-bg-color)"
            :diameter="100"
            :completed-steps="generationsCount"
            :total-steps="totalSteps"
          >
            <span>
              {{ progressEmoji }}
            </span>
            <strong>
              {{ progressCounter }}
            </strong>
          </RadialProgress>
        </RouterLink>
      </BCol>
      <BCol
        v-if="! online"
        cols="12"
        class="mb-3"
      >
        <BAlert
          variant="danger"
          :show="true"
        >
          {{ $t("views.tool.offline") }}
        </BAlert>
      </BCol>
      <BCol
        :class="forceTabDisplay ? '' : 'd-xl-none'"
        class="editor-tabs font-weight-bold pb-3 d-flex mt-3"
        cols="12"
      >
        <div
          :class="displayedTab === 'editor' ? 'active' : ''"
          class="editor-tabs__tab pb-2 text-center"
          @click="displayedTab = 'editor'"
        >
          <FontAwesomeIcon icon="terminal" />
          {{ $t("views.tool.editorTab") }}
        </div>
        <div
          :class="displayedTab === 'generated' ? 'active' : ''"
          class="editor-tabs__tab pb-2 text-center"
          @click="displayedTab = 'generated'"
        >
          <FontAwesomeIcon icon="play" />
          {{ $t("views.tool.generatedTab") }}
        </div>
      </BCol>
      <BCol
        :xl="forceTabDisplay ? 12 : 6"
        cols="12"
      >
        <EditorTab
          :online="online"
          :loading="loading"
          :exception-message="exceptionMessage"
          :exception="exception"
          :class="displayedTab === 'editor' ? 'd-block' : (forceTabDisplay ? 'd-none' : 'd-none d-xl-block' )"
          @generate="handleGenerate"
        />
      </BCol>
      <BCol
        :xl="forceTabDisplay ? 12 : 6"
        cols="12"
      >
        <GeneratedTab
          :test="test"
          :class="displayedTab === 'generated' ? 'd-block' : (forceTabDisplay ? 'd-none' : 'd-none d-xl-block' )"
        />
      </BCol>
    </BRow>
  </BContainer>
</template>

<script lang="ts">
    import Vue from "vue";
    import RadialProgress from "vue-radial-progress";
    import { Component, Inject } from "vue-property-decorator";
    import EditorTab from "@/components/tool/EditorTab.vue";
    import { Test, TestResourceI } from "@/container/contracts/testResourceI";
    import { TYPES } from "@/container/types";
    import { UnknownError } from "@/errors/UnknownError";
    import GeneratedTab from "@/components/tool/GeneratedTab.vue";
    import { TranslateResult } from "vue-i18n";
    import { StoreI } from "@/container/contracts/storeI";
    import { ThemeI } from "@/container/contracts/themeI";
    import { Theme } from "@/container/concerns/theme";
    import { Action } from "vuex-class";
    import { RateLimitError } from "@/errors/RateLimitError";

    @Component({
        components: {
            RadialProgress,
            GeneratedTab,
            EditorTab,
        },
    })
    export default class ToolView extends Vue {
        @Inject(TYPES.Store)
        protected readonly store!: StoreI;

        @Inject(TYPES.TestResource)
        protected readonly testResource!: TestResourceI;

        @Inject(TYPES.Theme)
        protected readonly theme!: ThemeI;

        @Action
        protected readonly requestThemeUnlock!: (newTheme: Theme) => Promise<boolean>;

        protected forceTabDisplay = this.store.getForceEditorTabs();

        protected displayedTab = "editor";

        protected loading = false;

        protected online = true;

        protected exceptionMessage: TranslateResult | null = null;

        protected exception: object | null = null;

        protected test: Test | null = null;

        protected generationsCount = this.store.getGenerationsCount();

        protected nextUnlockedTheme = this.theme.getNextUnlockedTheme();

        protected get totalSteps(): number {
            return this.nextUnlockedTheme ? this.nextUnlockedTheme.getGenerationsToUnlock() : this.generationsCount;
        }

        protected get progressEmoji(): string {
            return this.nextUnlockedTheme ? this.nextUnlockedTheme.getEmoji() : "🔥";
        }

        protected get progressCounter(): string {
            return `${this.generationsCount}${this.nextUnlockedTheme ? ` / ${this.nextUnlockedTheme.getGenerationsToUnlock()}` : ""}`;
        }

        protected beforeMount(): void {
            this.handleOnlineStatusChange();

            window.addEventListener("online", this.handleOnlineStatusChange);
            window.addEventListener("offline", this.handleOnlineStatusChange);
        }

        protected beforeDestroy(): void {
            window.removeEventListener("online", this.handleOnlineStatusChange);
            window.removeEventListener("offline", this.handleOnlineStatusChange);
        }

        public async handleGenerate(code: string): Promise<void> {
            if (code === "unicorn") {
                await this.$router.push({ name: "unicorn" });

                return;
            }

            this.loading = true;

            try {
                this.test = await this.testResource.create(code);

                this.exceptionMessage = null;
                this.exception = null;

                this.displayedTab = "generated";

                this.generationsCount++;
                this.store.incrementGenerationsCount().save();

                if (this.nextUnlockedTheme) {
                    const accepted = await this.requestThemeUnlock(this.nextUnlockedTheme);

                    if (accepted) {
                        this.handleThemeUnlocked(this.nextUnlockedTheme);

                        this.nextUnlockedTheme = this.theme.getNextUnlockedTheme();
                    }
                }
            } catch (error) {
                if (error instanceof UnknownError || error instanceof RateLimitError) {
                    this.exception = error.getException();
                } else {
                    this.exception = null;
                }

                this.exceptionMessage = this.$t("views.tool.exceptionMessage");
            }

            this.loading = false;
        }

        protected handleThemeUnlocked(newTheme: Theme): void {
            const themeName = this.$i18n.t(`common.themes.${newTheme.getKey()}`);
            const toastTitle = `${newTheme.getEmoji()} ${this.$i18n.t("layout.app.themeUnlockToast.title")}`;
            const toastDescription = this.$i18n.t("layout.app.themeUnlockToast.description", {
                theme: themeName,
            });

            this.$bvToast.toast(
                toastDescription as string,
                {
                    title: toastTitle,
                    autoHideDelay: 5000,
                },
            );
        }

        protected handleOnlineStatusChange(): void {
            this.online = window.navigator.onLine;
        }
    }
</script>
