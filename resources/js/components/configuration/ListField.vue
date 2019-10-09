<template>
    <div :id="id">
        <BRow>
            <BCol cols="6" md="8" lg="9">
                <label>
                    {{ name }}
                </label>
            </BCol>
            <BCol cols="6" md="4" lg="3">
                <BInputGroup class="ml-auto">
                    <BInputGroupPrepend>
                        <BInputGroupText>
                            <FontAwesomeIcon :icon="icons.faSearch"></FontAwesomeIcon>
                        </BInputGroupText>
                    </BInputGroupPrepend>
                    <BInput type="text"
                            :placeholder="$t('configuration.list_field.search')"
                            v-model="search"/>
                </BInputGroup>
            </BCol>
        </BRow>

        <BRow v-if="displayedValues.length > 0">
            <BCol v-for="value in displayedValues"
                  :key="value.id"
                  class="my-2"
                  lg="3"
                  sm="6">
                <div :id="listItemId(value.id)"
                     :class="selected === value.id ? 'active' : ''"
                     class="list-field-item d-flex flex-column align-items-center justify-content-center text-center rounded p-2 h-100"
                     @click="handleChange(value.id)">
                    <h4>{{ value.name }}</h4>
                    <small>
                        {{ $t('configuration.list_field.created_by') }}
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
                <div class="list-field-item d-flex flex-column align-items-center justify-content-center text-center rounded p-2 h-100"
                     @click="handleDisplayMore">
                    <strong>
                        <FontAwesomeIcon :icon="icons.faPlusCircle"></FontAwesomeIcon>
                        {{ $t('configuration.list_field.display_more') }}
                    </strong>
                </div>
            </BCol>
        </BRow>

        <BRow v-else>
            <BCol class="my-2">
                <strong>
                    {{ $t('configuration.list_field.no_result') }}
                </strong>
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
    import { faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

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
                search: '',
                selected: this.value,
                displayed: 3,
                icons: {
                    faPlusCircle,
                    faSearch,
                },
            };
        },
        computed: {
            hasMoreToDisplay() {
                return this.displayedValues.length > this.displayed;
            },
            displayedValues() {
                const displayedValues = [];
                const normalizedSearch = this.normalizeString(this.search);

                for (const key in this.values) {
                    const normalizedName = this.normalizeString(this.values[key].name);
                    if (this.values.hasOwnProperty(key)
                        && (this.values[key].id.includes(normalizedSearch) || normalizedName.includes(normalizedSearch))
                    ) {
                        displayedValues.push(this.values[key]);
                    }

                }

                return displayedValues.slice(0, this.displayed);
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
            normalizeString(string) {
                return string.normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase();
            },
        },
    };
</script>
