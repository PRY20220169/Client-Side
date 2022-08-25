<template>
  <article class="sc-article">

    <div class="num-article">
      <div class="check"></div>
      <span>{{ document.id + 1 }}</span>
    </div>

    <div class="info-article">
      <h5>{{ document.title }}</h5>
      <h6>
        <a href="#"
           v-for="(author, i) of document.authors"
           :key="i"
        >
          {{ author.lastName }}, {{ author.firstName}}
        </a>
      </h6>
      <span>{{ document.publicationDate.toLocaleString('EN', { month: 'long' }) }} {{ document.publicationDate.getFullYear() }} |
        <a href="#">{{ document.journal.name }}</a> {{ document.volume }}</span>
      <p>
        {{ document.description }}
      </p>
      <span>
        <a href="#">Free full text from publisher</a> |
        <a href="#">Google Scholar Lookup</a>
      </span>
    </div>

    <div class="bb-data-article">

      <div class="metadata-art"
            v-for="(metric,i) of document.journal.metrics"
           :key="i">
        <div class="metadata-type">
          <h2>{{ metric.score }}</h2>
          <i class="bx bx-link-external"></i>
        </div>

        <div>
          <h5>{{ metric.name }}</h5>
          <h6> From {{ metric.source }}</h6>
        </div>
        <hr>
      </div>
      <!--<div class="metadata-art">
        <div class="metadata-type">
          <h2>{{ document.journal.impactFactor }}</h2>
          <i class="bx bx-link-external"></i>
        </div>

        <div>
          <h5>Journal Impact Factor</h5>
          <h6>From {{ document.journal.source }}</h6>
        </div>
        <hr>
      </div>
      <div class="metadata-art">
        <div class="metadata-type">
          <h2>{{ document.journal.hIndex }}</h2>
          <i class="bx bx-link-external"></i>
        </div>

        <div>
          <h5>H-Index</h5>
          <h6>From {{ document.journal.source }}</h6>
        </div>
        <hr>
      </div>-->
    </div>
  </article>
</template>

<script lang="ts">
import {Article} from "@/interfaces/Article.interface";
import { PropType } from "vue";

export default {
  name: "pub-article",
  props: {
    document: {
      type: Object as PropType<Article>,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/styles/search-results-page/articles-search-rs";
</style>