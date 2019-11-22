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

        <BRow class="home-actions">
          <BCol
            class="px-1 text-md-right"
            md
          >
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
          </BCol>
          <BCol
            class="px-1 text-md-left mt-2 mt-md-0"
            md
          >
            <BButton
              class="px-4 py-3 rounded-pill"
              size="lg"
              href="/docs#/"
            >
              <FontAwesomeIcon
                class="mr-2"
                icon="book"
              />
              {{ $t("views.home.actions.documentation") }}
            </BButton>
          </BCol>
        </BRow>
      </BContainer>
    </div>

    <div class="position-relative">
      <HomeWaves />
    </div>

    <div class="home-features">
      <BContainer>
        <h2 class="pt-5 text-center">
          {{ $t("views.home.features.title") }}
        </h2>

        <BRow class="pt-3 pb-5">
          <HomeCard
            href="/docs"
            feature="console"
          />
          <HomeCard
            :to="{ name: 'tool' }"
            feature="webapp"
          />
          <HomeCard
            href="/docs"
            feature="api"
          />
        </BRow>

        <BRow class="pt-5 pb-5">
          <BCol
            class="text-center text-lg-right"
            lg="6"
          >
            <img
              :alt="$t('views.home.features.documentation.title')"
              src="https://fakeimg.pl/500x250/"
              class="rounded"
            >
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
            class="text-center text-lg-left"
            order-lg="2"
            lg="6"
          >
            <img
              :alt="$t('views.home.features.modularity.title')"
              src="https://fakeimg.pl/500x250/"
              class="rounded"
            >
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
              <div>
                <BButton
                  :to="{ name: 'tool' }"
                  variant="primary"
                  class="mr-lg-1 py-2 px-4"
                >
                  {{ $t("views.home.actions.try_online") }}
                </BButton>
                <BButton
                  href="/docs#/"
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
    import HomeWaves from "@/components/home/HomeWaves.vue";
    import HomeCard from "@/components/home/HomeCard.vue";
    import { Component } from "vue-property-decorator";

    @Component({
        components: {
            HomeCard,
            HomeWaves,
        }
    })
    export default class HomeView extends Vue {
    }
</script>
