<template>
    <BContainer class="my-5">
        <BRow>
            <BCol cols="12"
                  class="d-flex align-items-center">
                <RouterLink :to="{ name: 'themes' }">
                    <RadialProgress start-color="var(--gradient-start-color)"
                                           stop-color="var(--gradient-stop-color)"
                                           inner-stroke-color="var(--secondary-bg-color)"
                                           :diameter="100"
                                           :completed-steps="generationsCount"
                                           :total-steps="totalSteps">
                        <span>
                            {{ progressEmoji }}
                        </span>
                        <strong>
                            {{ progressCounter }}
                        </strong>
                    </RadialProgress>
                </RouterLink>
                <p class="ml-2 mb-0">
                    {{ nextUnlockedTheme ? $t("views.tool.unlockThemes") : $t("views.tool.allThemesUnlocked") }}
                    <RouterLink :to="{ name: 'themes' }">
                        {{ $t("views.tool.themeListLink") }}
                    </RouterLink>
                </p>
            </BCol>
            <BCol :class="forceTabDisplay ? '' : 'd-xl-none'"
                  class="editor-tabs font-weight-bold pb-3 d-flex"
                  cols="12">
                <div @click="displayedTab = 'editor'"
                     :class="displayedTab === 'editor' ? 'active' : ''"
                     class="editor-tabs__tab pb-2 text-center">
                    <FontAwesomeIcon icon="terminal"></FontAwesomeIcon>
                    {{ $t("views.tool.editorTab") }}
                </div>
                <div @click="displayedTab = 'generated'"
                     :class="displayedTab === 'generated' ? 'active' : ''"
                     class="editor-tabs__tab pb-2 text-center">
                    <FontAwesomeIcon icon="play"></FontAwesomeIcon>
                    {{ $t("views.tool.generatedTab") }}
                </div>
            </BCol>
            <BCol :xl="forceTabDisplay ? 12 : 6"
                  cols="12">
                <EditorTab @generate="handleGenerate"
                           :loading="loading"
                           :exception-message="exceptionMessage"
                           :exception="exception"
                           :class="displayedTab === 'editor' ? 'd-block' : (forceTabDisplay ? 'd-none' : 'd-none d-xl-block' )"/>
            </BCol>
            <BCol :xl="forceTabDisplay ? 12 : 6"
                  cols="12">
                <GeneratedTab :test="test"
                              :class="displayedTab === 'generated' ? 'd-block' : (forceTabDisplay ? 'd-none' : 'd-none d-xl-block' )"/>
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

    @Component({
        components: {
            RadialProgress,
            GeneratedTab,
            EditorTab,
        }
    })
    export default class ToolView extends Vue {
        @Inject(TYPES.Store)
        protected store!: StoreI;

        @Inject(TYPES.TestResource)
        protected testResource!: TestResourceI;

        @Inject(TYPES.Theme)
        protected theme!: ThemeI;

        protected forceTabDisplay = this.store.getForceEditorTabs();

        protected displayedTab = "editor";

        protected loading: boolean = false;

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

        public async handleGenerate(code: string): Promise<void> {
            this.loading = true;

            try {
                this.test = await this.testResource.create(code);

                this.exceptionMessage = null;
                this.exception = null;

                this.displayedTab = "generated";

                const nextUnlockedTheme = this.theme.getNextUnlockedTheme();

                this.generationsCount++;
                this.store.incrementGenerationsCount().save();

                if (nextUnlockedTheme && this.generationsCount === nextUnlockedTheme.getGenerationsToUnlock()) {
                    this.$emit("theme-unlock", nextUnlockedTheme);
                    this.nextUnlockedTheme = this.theme.getNextUnlockedTheme();
                }
            } catch (error) {
                if (error instanceof UnknownError) {
                    this.exception = error.getException();
                } else {
                    this.exception = null;
                }

                this.exceptionMessage = this.$t("views.tool.exceptionMessage");
            }

            this.loading = false;
        }
    };
</script>
