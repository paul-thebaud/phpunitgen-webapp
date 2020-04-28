<template>
  <div class="home-container">
    <div class="home-wrapper">
      <BContainer class="text-center">
        <div class="home-title">
          {{ $t("views.home.welcome.title") }}
        </div>

        <div class="home-description">
          {{ $t("views.home.welcome.description") }}
          <br>
          {{ $t("views.home.welcome.open-source") }}
        </div>

        <BRow class="home-actions justify-content-center">
          <div class="px-1 text-md-right d-block w-100 w-md-auto">
            <BButton
              :to="{ name: 'tool' }"
              class="px-4 py-3 rounded-pill"
              size="lg"
            >
              <FontAwesomeIcon
                class="mr-2"
                icon="rocket"
              />
              {{ $t("views.home.actions.online") }}
            </BButton>
          </div>
          <div class="px-1 text-md-left mt-2 mt-md-0 d-block w-md-100">
            <BButton
              class="px-4 py-3 rounded-pill"
              size="lg"
              :href="locale.localizedDocs()"
            >
              <FontAwesomeIcon
                class="mr-2"
                icon="book"
              />
              {{ $t("views.home.actions.documentation") }}
            </BButton>
          </div>
        </BRow>
      </BContainer>
    </div>

    <div class="position-relative">
      <SvgVue
        icon="waves"
        class="home-waves"
      />
    </div>

    <div class="home-features">
      <BContainer>
        <div class="pt-5 text-center">
          <h3>
            {{ $t("views.home.features.simplicity.title") }}
          </h3>

          <BRow class="mt-3">
            <HomeVideo
              src="/video/webapp.mp4"
              :description="$t('views.home.features.simplicity.descriptionWebApp')"
            />
            <HomeVideo
              src="/video/terminal.mp4"
              :description="$t('views.home.features.simplicity.descriptionTerminal')"
            />
          </BRow>
        </div>

        <h2 class="pt-5 text-center">
          {{ $t("views.home.features.title") }}
        </h2>

        <BRow class="pt-3 pb-5">
          <HomeCard
            :href="locale.localizedDocs('command-line')"
            feature="console"
          />
          <HomeCard
            :to="{ name: 'tool' }"
            feature="webapp"
          />
          <HomeCard
            :href="locale.localizedDocs('webapp')"
            feature="api"
          />
        </BRow>

        <BRow class="pt-5 pb-5">
          <BCol
            class="d-flex justify-content-center justify-content-lg-end"
            lg="6"
          >
            <div class="home-features-img-wrapper">
              <img
                :alt="$t('views.home.features.documentation.title')"
                src="/img/features/docs.webp"
                class="rounded shadow"
              >
            </div>
          </BCol>
          <BCol
            class="d-flex flex-column justify-content-center text-center text-lg-left mt-3 mt-lg-0"
            lg="6"
          >
            <h3>
              {{ $t("views.home.features.documentation.title") }}
            </h3>
            <p v-html="$t('views.home.features.documentation.description')" />
          </BCol>
        </BRow>

        <BRow class="pt-5 pb-5">
          <BCol
            class="d-flex justify-content-center justify-content-lg-start"
            order-lg="2"
            lg="6"
          >
            <div class="home-features-img-wrapper">
              <img
                :alt="$t('views.home.features.modularity.title')"
                src="/img/features/modularity.webp"
                class="rounded shadow"
              >
            </div>
          </BCol>
          <BCol
            class="d-flex flex-column justify-content-center text-center text-lg-right mt-3 mt-lg-0"
            order-lg="1"
            lg="6"
          >
            <h3>
              {{ $t("views.home.features.modularity.title") }}
            </h3>
            <p v-html="$t('views.home.features.modularity.description')" />
          </BCol>
        </BRow>
      </BContainer>
    </div>

    <div class="home-ready">
      <BContainer>
        <BContainer>
          <BRow class="pt-5 pb-5">
            <BCol class="text-center">
              <h3>
                {{ $t("views.home.ready.title") }}
              </h3>
              <p>
                {{ $t("views.home.ready.description") }}
              </p>
              <div class="d-flex flex-column flex-lg-row justify-content-center align-items-center">
                <BButton
                  :to="{ name: 'tool' }"
                  variant="primary"
                  class="mr-lg-1 py-2 px-4"
                >
                  {{ $t("views.home.actions.try_online") }}
                </BButton>
                <BButton
                  :href="locale.localizedDocs()"
                  variant="secondary"
                  class="mt-2 mt-lg-0 ml-lg-1 py-2 px-4"
                >
                  {{ $t("views.home.actions.documentation") }}
                </BButton>
              </div>
            </BCol>
          </BRow>
        </BContainer>
      </BContainer>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import HomeCard from "@/components/home/HomeCard.vue";
    import { Component, Inject } from "vue-property-decorator";
    import { LocaleI } from "@/container/contracts/localeI";
    import { TYPES } from "@/container/types";
    import HomeVideo from "@/components/home/HomeVideo.vue";

    @Component({
        components: {
            HomeVideo,
            HomeCard,
        },
    })
    export default class HomeView extends Vue {
        @Inject(TYPES.Locale)
        protected readonly locale!: LocaleI;
    }
</script>
