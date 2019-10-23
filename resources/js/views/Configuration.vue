<template>
    <BContainer class="my-5">
        <h1>{{ $t('configuration.title') }}</h1>
        <p>{{ $t('configuration.description') }}</p>
        <BRow>
            <BCol md="4" lg="3">
                <div class="configuration-quick-links sticky-top d-sm-none d-md-block" style="top: 80px">
                    <StateIndicator id="configuration-saving-state"
                                    class="mt-3"
                                    :text="configSaving ? $t('configuration.state.saving') : $t('configuration.state.saved')"
                                    :variant="configSaving ? 'warning' : 'success'"/>
                    <strong class="d-block mt-3 mb-2">
                        {{ $t(`configuration.quick_links`) }}
                    </strong>
                    <a v-for="field in fields"
                       v-scroll-to="{ el: `#${field}`, offset: -80 }"
                       class="d-block ml-2 pb-2"
                       href="#"
                       :key="field">
                        {{ $t(`configuration.${snakeCase(field)}.name`) }}
                    </a>
                </div>
            </BCol>
            <BCol md="8" lg="9">
                <BForm class="configuration">
                    <BRow>
                        <BCol class="my-3" lg="6">
                            <BFormCheckbox v-model="config.automatic_generation"
                                           id="automatic-generation"
                                           switch>
                                {{ $t('configuration.automatic_generation.name') }}
                            </BFormCheckbox>
                            <BFormText>
                                {{ $t('configuration.automatic_generation.help') }}
                            </BFormText>
                        </BCol>

                        <div class="w-100"></div>

                        <BCol class="my-3" md="12">
                            <ListField v-model="config.test_generator"
                                       id="test-generator"
                                       :name="$t('configuration.test_generator.name')"
                                       :values="testGenerators"
                                       :help="$t('configuration.test_generator.help')"/>
                        </BCol>

                        <div class="w-100"></div>

                        <BCol class="my-3" md="12">
                            <ListField v-model="config.mock_generator"
                                       id="mock-generator"
                                       :name="$t('configuration.mock_generator.name')"
                                       :values="mockGenerators"
                                       :help="$t('configuration.mock_generator.help')"/>
                        </BCol>

                        <BCol class="my-3" md="6">
                            <TextField v-model="config.base_namespace"
                                       id="base-namespace"
                                       :name="$t('configuration.base_namespace.name')"
                                       :placeholder="$t('configuration.base_namespace.placeholder')"
                                       :help="$t('configuration.base_namespace.help')"/>
                        </BCol>
                        <BCol class="my-3" md="6">
                            <TextField v-model="config.base_test_namespace"
                                       id="base-test-namespace"
                                       :name="$t('configuration.base_test_namespace.name')"
                                       :placeholder="$t('configuration.base_test_namespace.placeholder')"
                                       :help="$t('configuration.base_test_namespace.help')"/>
                        </BCol>
                        <BCol class="my-3" md="6">
                            <TextField v-model="config.test_case"
                                       id="test-case"
                                       :name="$t('configuration.test_case.name')"
                                       :placeholder="$t('configuration.test_case.placeholder')"
                                       :help="$t('configuration.test_case.help')"/>
                        </BCol>

                        <div class="w-100"></div>

                        <BCol class="my-3" md="12">
                            <ArrayField v-model="config.excluded_methods"
                                        id="excluded-methods"
                                        :name="$t('configuration.excluded_methods.name')"
                                        :placeholder="$t('configuration.excluded_methods.placeholder')"
                                        :help="$t('configuration.excluded_methods.help')"/>
                        </BCol>
                        <BCol class="my-3" md="12">
                            <ArrayField v-model="config.merged_php_doc"
                                        id="merged-php-doc"
                                        :name="$t('configuration.merged_php_doc.name')"
                                        :placeholder="$t('configuration.merged_php_doc.placeholder')"
                                        :help="$t('configuration.merged_php_doc.help')"/>
                        </BCol>
                        <BCol class="my-3" md="12">
                            <ArrayField v-model="config.php_doc"
                                        id="php-doc"
                                        :name="$t('configuration.php_doc.name')"
                                        :placeholder="$t('configuration.php_doc.placeholder')"
                                        :help="$t('configuration.php_doc.help')"/>
                        </BCol>

                        <BCol class="my-3" md="12">
                            <ObjectField v-model="config.options"
                                         id="options"
                                         :name="$t('configuration.options.name')"
                                         :placeholder-key="$t('configuration.options.placeholder_key')"
                                         :placeholder-value="$t('configuration.options.placeholder_value')"
                                         :help="$t('configuration.options.help')"/>
                        </BCol>
                    </BRow>
                </BForm>
            </BCol>
        </BRow>
    </BContainer>
</template>

<script>
    import '@sass/views/configuration.scss';
    import debounce from 'lodash.debounce';
    import snakeCase from 'lodash.snakecase';
    import { storage } from '@/services';
    import StateIndicator from '@/components/tool/StateIndicator';
    import ArrayField from '@/components/configuration/ArrayField';
    import TextField from '@/components/configuration/TextField';
    import ObjectField from '@/components/configuration/ObjectField';
    import ListField from '@/components/configuration/ListField';
    import { mockGeneratorResource, testGeneratorResource } from '@/resources';

    export default {
        components: {
            StateIndicator,
            ListField,
            ArrayField,
            ObjectField,
            TextField,
        },
        data() {
            return {
                snakeCase,
                configSaving: false,
                config: storage.get('tool'),
                fields: [
                    'automatic-generation',
                    'test-generator',
                    'mock-generator',
                    'base-namespace',
                    'base-test-namespace',
                    'test-case',
                    'excluded-methods',
                    'merged-php-doc',
                    'php-doc',
                    'options',
                ],
                testGenerators: [],
                mockGenerators: [],
            };
        },
        async created() {
            await this.loadGenerators();
        },
        watch: {
            '$i18n.locale': async function () {
                await this.loadGenerators();
            },
            config: {
                handler() {
                    this.configSaving = true;

                    this.debounceConfigSave();
                },
                deep: true,
            },
        },
        methods: {
            async loadGenerators() {
                this.testGenerators = await testGeneratorResource.all();
                this.mockGenerators = await mockGeneratorResource.all();
            },
            debounceConfigSave: debounce(function () {
                this.configSaving = false;
                storage.set('tool', this.config);
            }, 500),
        },
    };
</script>
