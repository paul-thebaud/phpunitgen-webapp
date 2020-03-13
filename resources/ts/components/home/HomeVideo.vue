<template>
  <BCol md>
    <div class="video-wrapper mx-auto pt-3">
      <video
        class="rounded shadow"
        autoplay
        muted
        loop
      >
        <source
          :src="src"
          type="video/mp4"
        >
      </video>
    </div>
  </BCol>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Prop } from "vue-property-decorator";

    @Component
    export default class HomeVideo extends Vue {
        @Prop(String)
        protected readonly src!: string;
    }
</script>
