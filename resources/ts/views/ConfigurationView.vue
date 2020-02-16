<template>
  <BContainer class="configuration my-5">
    <h1>{{ $t("views.configuration.title") }}</h1>
    <p>{{ $t("views.configuration.description") }}</p>
    <BRow class="mt-5">
      <BCol
        class="d-none d-lg-block"
        lg="3"
      >
        <div
          class="my-3 sticky-top"
          style="top: 80px"
        >
          <span :class="saving ? 'text-warning' : 'text-success'">
            <FontAwesomeIcon
              :icon="saving ? 'circle-notch' : 'check-circle'"
              :class="saving ? 'fa-spin' : ''"
              class="mr-1"
            />
            {{ saving ? $t("views.configuration.state.saving") : $t("views.configuration.state.saved") }}
          </span>
          <strong class="d-block mt-3 mb-2">
            {{ $t(`views.configuration.quickLinks`) }}
          </strong>
          <a
            v-for="quickLink in quickLinks"
            :key="quickLink"
            v-scroll-to="{ el: `#${quickLinkId(quickLink)}`, offset: -80 }"
            class="configuration-quick-link d-block ml-2 pb-2"
            href="#"
          >
            {{ $t(`views.configuration.${quickLink}.label`) }}
          </a>
        </div>
      </BCol>
      <BCol lg="9">
        <BRow>
          <BCol
            sm="6"
            class="my-3"
          >
            <BFormCheckbox
              id="force-editor-tabs"
              v-model="forceEditorTabs"
              switch
            >
              {{ $t("views.configuration.forceEditorTabs.label") }}
            </BFormCheckbox>
            <BFormText>
              {{ $t("views.configuration.forceEditorTabs.help") }}
            </BFormText>
          </BCol>

          <BCol
            sm="6"
            class="my-3"
          >
            <BFormCheckbox
              id="automatic-generation"
              v-model="tool.automaticGeneration"
              switch
            >
              {{ $t("views.configuration.automaticGeneration.label") }}
            </BFormCheckbox>
            <BFormText>
              {{ $t("views.configuration.automaticGeneration.help") }}
            </BFormText>
          </BCol>

          <BCol
            cols="12"
            class="my-3"
          >
            <CardSelectField
              id="test-generator"
              v-model="tool.testGenerator"
              :values="testGenerators"
              :search-resolver="(generator) => `${generator.name}${generator.description}`"
              :label="$t('views.configuration.testGenerator.label')"
              :help="$t('views.configuration.testGenerator.help')"
              :loading="generatorsLoading"
            >
              <template v-slot:value="{ value: testGenerator }">
                <strong>
                  {{ testGenerator.name }}
                </strong>
                <small>
                  {{ $t("views.configuration.testGenerator.createdBy") }}
                  <a
                    :href="testGenerator.author.website"
                    target="_blank"
                    rel="noopener"
                  >
                    {{ testGenerator.author.name }}
                  </a>
                </small>

                <BTooltip
                  placement="bottom"
                  :target="`test-generator-${testGenerator.id}`"
                >
                  {{ testGenerator.description }}
                </BTooltip>
              </template>
            </CardSelectField>
          </BCol>

          <BCol
            cols="12"
            class="my-3"
          >
            <CardSelectField
              id="mock-generator"
              v-model="tool.mockGenerator"
              :values="mockGenerators"
              :label="$t('views.configuration.mockGenerator.label')"
              :help="$t('views.configuration.mockGenerator.help')"
              :display-all="true"
              :loading="generatorsLoading"
            >
              <template v-slot:value="{ value: mockGenerator }">
                <strong>
                  {{ mockGenerator.name }}
                </strong>
                <small>
                  {{ $t("views.configuration.mockGenerator.createdBy") }}
                  <a
                    :href="mockGenerator.author.website"
                    target="_blank"
                    rel="noopener"
                  >
                    {{ mockGenerator.author.name }}
                  </a>
                </small>

                <BTooltip
                  placement="bottom"
                  :target="`mock-generator-${mockGenerator.id}`"
                >
                  {{ mockGenerator.description }}
                </BTooltip>
              </template>
            </CardSelectField>
          </BCol>

          <BCol
            md="6"
            class="my-3"
          >
            <TextField
              id="base-namespace"
              v-model="tool.baseNamespace"
              :label="$t('views.configuration.baseNamespace.label')"
              :placeholder="$t('views.configuration.baseNamespace.placeholder')"
              :help="$t('views.configuration.baseNamespace.help')"
            />
          </BCol>

          <BCol
            md="6"
            class="my-3"
          >
            <TextField
              id="base-test-namespace"
              v-model="tool.baseTestNamespace"
              :label="$t('views.configuration.baseTestNamespace.label')"
              :placeholder="$t('views.configuration.baseTestNamespace.placeholder')"
              :help="$t('views.configuration.baseTestNamespace.help')"
            />
          </BCol>

          <BCol
            md="6"
            class="my-3"
          >
            <TextField
              id="test-case"
              v-model="tool.testCase"
              :label="$t('views.configuration.testCase.label')"
              :placeholder="$t('views.configuration.testCase.placeholder')"
              :help="$t('views.configuration.testCase.help')"
            />
          </BCol>

          <BCol
            cols="12"
            class="my-3"
          >
            <ListField
              id="excluded-methods"
              v-model="tool.excludedMethods"
              :label="$t('views.configuration.excludedMethods.label')"
              :placeholder="$t('views.configuration.excludedMethods.placeholder')"
              :help="$t('views.configuration.excludedMethods.help')"
            />
          </BCol>

          <BCol
            cols="12"
            class="my-3"
          >
            <ListField
              id="merged-php-doc"
              v-model="tool.mergedPhpDoc"
              :label="$t('views.configuration.mergedPhpDoc.label')"
              :placeholder="$t('views.configuration.mergedPhpDoc.placeholder')"
              :help="$t('views.configuration.mergedPhpDoc.help')"
            />
          </BCol>

          <BCol
            cols="12"
            class="my-3"
          >
            <ListField
              id="php-doc"
              v-model="tool.phpDoc"
              :label="$t('views.configuration.phpDoc.label')"
              :placeholder="$t('views.configuration.phpDoc.placeholder')"
              :help="$t('views.configuration.phpDoc.help')"
            />
          </BCol>

          <BCol
            cols="12"
            class="my-3"
          >
            <CardSelectField
              id="options-context"
              v-model="tool.options.context"
              :values="contexts"
              :label="$t('views.configuration.optionsContext.label')"
              :help="$t('views.configuration.optionsContext.help')"
              :display-all="true"
            >
              <template v-slot:value="{ value: context }">
                <strong>
                  {{ context }}
                </strong>
              </template>
            </CardSelectField>
          </BCol>

          <BCol
            v-if="tool.options.context === 'laravel'"
            md="6"
            class="my-3"
          >
            <TextField
              id="options-laravel-user"
              v-model="tool.options['laravel.user']"
              :label="$t('views.configuration.optionsLaravelUser.label')"
              :placeholder="$t('views.configuration.optionsLaravelUser.placeholder')"
              :help="$t('views.configuration.optionsLaravelUser.help')"
            />
          </BCol>
        </BRow>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script lang="ts">
    import debounce from "lodash.debounce";
    import Vue from "vue";
    import { Component, Inject, Watch } from "vue-property-decorator";
    import { TYPES } from "@/container/types";
    import { StoreI } from "@/container/contracts/storeI";
    import { TestGenerator, TestGeneratorResourceI } from "@/container/contracts/testGeneratorResourceI";
    import { MockGenerator, MockGeneratorResourceI } from "@/container/contracts/mockGeneratorResourceI";
    import CardSelectField from "@/components/forms/CardSelectField.vue";
    import TextField from "@/components/forms/TextField.vue";
    import ListField from "@/components/forms/ListField.vue";
    import { TranslateResult } from "vue-i18n";
    import { Dictionary } from "@/utils/types";

    @Component({
        components: {
            CardSelectField,
            TextField,
            ListField,
        },
    })
    export default class ConfigurationView extends Vue {
        @Inject(TYPES.Store)
        protected store!: StoreI;

        @Inject(TYPES.MockGeneratorResource)
        protected mockGeneratorResource!: MockGeneratorResourceI;

        @Inject(TYPES.TestGeneratorResource)
        protected testGeneratorResource!: TestGeneratorResourceI;

        protected forceEditorTabs = this.store.getForceEditorTabs();

        protected tool = this.store.getTool();

        protected generatorsLoading = true;

        protected testGenerators: Dictionary<TestGenerator> = {};

        protected mockGenerators: Dictionary<MockGenerator> = {};

        protected contexts: Dictionary<TranslateResult> = {};

        protected saving = false;

        protected debouncedSave = debounce(function (this: ConfigurationView) {
            this.store.setForceEditorTabs(this.forceEditorTabs)
                .setTool(this.tool)
                .save();
            this.saving = false;
        }, 500);

        protected get quickLinks(): string[] {
            const quickLinks = [
                "forceEditorTabs",
                "automaticGeneration",
                "testGenerator",
                "mockGenerator",
                "baseNamespace",
                "baseTestNamespace",
                "testCase",
                "excludedMethods",
                "mergedPhpDoc",
                "phpDoc",
                "optionsContext",
            ];

            if (this.tool.options.context === "laravel") {
                quickLinks.push("optionsLaravelUser");
            }

            return quickLinks;
        }

        @Watch("$i18n.locale")
        protected async onLocaleChange(): Promise<void> {
            await this.loadGenerators();
        }

        @Watch("forceEditorTabs")
        protected onForceEditorTabsChange(): void {
            this.handleSave();
        }

        @Watch("tool", { deep: true })
        protected onToolChange(): void {
            this.handleSave();
        }

        protected async created(): Promise<void> {
            await this.loadGenerators();
        }

        protected async loadGenerators(): Promise<void> {
            this.generatorsLoading = true;

            this.testGenerators = this.mapArrayToObjectById(await this.testGeneratorResource.all());
            this.mockGenerators = this.mapArrayToObjectById(await this.mockGeneratorResource.all());
            this.contexts = {
                laravel: this.$t("views.configuration.optionsContext.values.laravel"),
                null: this.$t("views.configuration.optionsContext.values.null"),
            };

            this.generatorsLoading = false;
        }

        protected quickLinkId(name: string): string {
            return name.replace(/([a-z])([A-Z])/g, "$1-$2")
                .replace(/\s+/g, "-")
                .toLowerCase();
        }

        protected handleSave(): void {
            this.saving = true;

            this.debouncedSave();
        }

        protected mapArrayToObjectById<T extends { id: string }>(items: T[]): Dictionary<T> {
            const keyedItems = {} as Dictionary<T>;

            items.forEach(item => {
                keyedItems[item.id] = item;
            });

            return keyedItems;
        }
    }
</script>
