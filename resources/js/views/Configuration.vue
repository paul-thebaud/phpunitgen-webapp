<template>
    <BContainer class="my-5">
        <div class="d-flex">
            <h1>{{ $t('configuration.title') }}</h1>
            <StateIndicator id="configuration-saving-state"
                            class="my-auto ml-auto"
                            :text="configSaving ? $t('configuration.state.saving') : $t('configuration.state.saved')"
                            :variant="configSaving ? 'warning' : 'success'"/>
        </div>
        <p>{{ $t('configuration.description') }}</p>
        <BForm class="configuration">
            <BRow>
                <BCol class="my-3" md="6">
                    <BFormCheckbox v-model="config.automatic_generation"
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
    </BContainer>
</template>

<script>
    import '@sass/views/configuration.scss';
    import debounce from 'lodash.debounce';
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
                configSaving: false,
                config: storage.get('tool'),
                testGenerators: [],
                mockGenerators: [],
            };
        },
        async created() {
            this.testGenerators = await testGeneratorResource.all();
            this.mockGenerators = await mockGeneratorResource.all();
        },
        watch: {
            config: {
                handler() {
                    this.configSaving = true;

                    this.debounceConfigSave();
                },
                deep: true,
            },
        },
        methods: {
            debounceConfigSave: debounce(function () {
                this.configSaving = false;
                storage.set('tool', this.config);
            }, 500),
        },
    };
</script>
