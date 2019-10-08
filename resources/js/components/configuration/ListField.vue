<template>
    <div :id="id">
        <label>
            {{ name }}
        </label>
        <BRow class="row-eq-height">
            <BCol v-for="value in displayedValues"
                  :key="value.id"
                  class="my-2"
                  lg="3"
                  sm="6">
                <div :id="listItemId(value.id)"
                     :class="selected === value.id ? 'active' : ''"
                     class="list-field-item d-flex flex-column align-items-center justify-content-center text-center bg-secondary rounded p-2 h-100"
                     @click="handleChange(value.id)">
                    <h4>{{ value.name }}</h4>
                    <small>
                        {{ $t('configuration.generator.created_by') }}
                        <a :href="value.author.website" target="_blank" rel="noopener">
                            {{ value.author.name }}
                        </a>
                    </small>
                </div>

                <BTooltip placement="bottom" :target="listItemId(value.id)">
                    {{ value.description }}
                </BTooltip>
            </BCol>

            <BCol v-if="hasMoreToDisplay"
                  class="my-2"
                  lg="3"
                  sm="6">
                <div class="list-field-item d-flex flex-column align-items-center justify-content-center text-center bg-secondary rounded p-2 h-100"
                     @click="handleDisplayMore">
                    <strong>
                        <FontAwesomeIcon :icon="icons.faPlusCircle"></FontAwesomeIcon>
                        {{ $t('configuration.generator.display_more') }}
                    </strong>
                </div>
            </BCol>
        </BRow>
        <BFormText>
            {{ help }}
        </BFormText>
    </div>
</template>

<script>
    import '@sass/components/configuration/list-field.scss';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

    export default {
        components: {
            FontAwesomeIcon,
        },
        props: {
            id: {
                required: true,
                type: String,
            },
            name: {
                required: true,
                type: String,
            },
            help: {
                required: true,
                type: String,
            },
            values: {
                required: true,
                type: Array,
            },
            value: {
                required: false,
                type: String,
            },
        },
        data() {
            return {
                selected: this.value,
                displayed: 3,
                icons: {
                    faPlusCircle,
                },
            };
        },
        computed: {
            hasMoreToDisplay() {
                return this.values.length > this.displayed;
            },
            displayedValues() {
                return this.values.slice(0, this.displayed);
            },
        },
        methods: {
            handleDisplayMore() {
                this.displayed = this.values.length;
            },
            listItemId(key) {
                return `${this.id}-item-${key}`;
            },
            handleChange(key) {
                this.selected = key;

                this.$emit('input', this.selected);
            },
        },
    };
</script>
