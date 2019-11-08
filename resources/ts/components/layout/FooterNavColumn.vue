<template>
    <BCol cols="6" md="4">
        <p class="text-uppercase font-weight-bold">
            {{ $t("layout.footer.authors.title") }}
        </p>
        <ul>
            <li v-for="link in links"
                :key="link.href">
                <b-link :href="link.href"
                        target="_blank"
                        rel="noopener">
                    {{ link.title }}
                </b-link>
            </li>
        </ul>
    </BCol>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Prop } from "vue-property-decorator";

    @Component
    export default class FooterNavColumn extends Vue {
        @Prop(String)
        protected name!: string;

        @Prop(Array)
        protected links!: { title: string, href: string }[];
    };
</script>
