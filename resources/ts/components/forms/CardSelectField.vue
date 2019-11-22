<template>
  <div
    :id="id"
    class="card-select"
  >
    <BRow v-if="label">
      <BCol
        cols="6"
        md="6"
        lg="9"
      >
        <label>
          {{ label }}
        </label>
      </BCol>
      <BCol
        v-if="searchResolver"
        cols="6"
        md="6"
        lg="3"
      >
        <BInputGroup class="ml-auto">
          <BInputGroupPrepend>
            <BInputGroupText>
              <FontAwesomeIcon icon="search" />
            </BInputGroupText>
          </BInputGroupPrepend>
          <BInput
            v-model="search"
            :placeholder="$t('components.forms.cardSelect.searchPlaceholder')"
            type="text"
            autocomplete="new-password"
          />
        </BInputGroup>
      </BCol>
    </BRow>

    <BRow v-if="Object.keys(displayedValues).length > 0">
      <BCol
        v-for="(value, targetKey) in displayedValues"
        :key="targetKey"
        class="my-3"
        lg="3"
        sm="6"
      >
        <BCard
          :id="`${id}-${targetKey}`"
          :class="computeClasses(targetKey, selectedKey)"
          body-class="d-flex flex-column align-items-center justify-content-center text-center rounded p-2 h-100"
          @click="handleChange(targetKey)"
        >
          <slot
            name="value"
            :value="value"
          />
        </BCard>
      </BCol>

      <BCol
        v-if="hasMoreToDisplay"
        class="my-3"
        lg="3"
        sm="6"
      >
        <div
          class="card card-body d-flex flex-column align-items-center justify-content-center text-center rounded p-2 h-100"
          @click="handleDisplayMore"
        >
          <strong>
            <FontAwesomeIcon icon="plus-circle" />
            {{ $t("components.forms.cardSelect.displayMore") }}
          </strong>
        </div>
      </BCol>
    </BRow>

    <BRow v-else>
      <BCol class="my-2">
        <strong>
          {{ $t("components.forms.cardSelect.noResult") }}
        </strong>
      </BCol>
    </BRow>

    <BFormText v-if="help">
      {{ help }}
    </BFormText>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Prop } from "vue-property-decorator";
    import { Dictionary } from "@/utils/types";

    @Component
    export default class CardSelectField extends Vue {
        @Prop(String)
        protected id!: string;

        @Prop(String)
        protected label!: string;

        @Prop(String)
        protected help!: string;

        @Prop(Object)
        protected values!: Dictionary<object>;

        @Prop(String)
        protected value!: string;

        @Prop({ type: Boolean, default: false })
        protected displayAll!: boolean;

        @Prop(Function)
        protected searchResolver!: (value: object) => string;

        @Prop({ type: Function, default: (key: string, selectedKey: string) => selectedKey === key ? "active" : "" })
        protected computeClasses!: (key: string, selectedKey: string) => string;

        protected search = "";

        protected selectedKey = this.value;

        protected displayedCount = this.displayAll ? Object.keys(this.values).length : 3;

        protected get filteredValues(): Dictionary<object> {
            if (this.searchResolver === undefined || this.search === "") {
                return this.values;
            }

            const filteredValues = {} as Dictionary<object>;
            const normalizedSearch = this.normalizeString(this.search);

            Object.keys(this.values).forEach(key => {
                if (key.includes(normalizedSearch)
                    || this.normalizeString(this.searchResolver(this.values[key])).includes(normalizedSearch)
                ) {
                    filteredValues[key] = this.values[key];
                }
            });

            return filteredValues;
        }

        protected get displayedValues(): Dictionary<object> {
            const filteredValues = this.filteredValues;
            const displayedValues = {} as Dictionary<object>;

            Object.keys(filteredValues)
                .slice(0, this.displayedCount)
                .forEach(key => {
                    displayedValues[key] = filteredValues[key];
                });

            return displayedValues;
        }

        protected get hasMoreToDisplay(): boolean {
            return Object.keys(this.filteredValues).length > this.displayedCount;
        }

        protected handleDisplayMore(): void {
            this.displayedCount = Object.keys(this.values).length;
        }

        protected handleChange(key: string): void {
            this.$emit("input", this.selectedKey = key);
        }

        protected normalizeString(str: string): string {
            return str.normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();
        }
    }
</script>
