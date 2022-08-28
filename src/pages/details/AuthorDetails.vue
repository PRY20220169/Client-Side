<template>
  <main class="author-details">
    <div id="content-author-details">
      <div id="author-card">
        <div class="card__info">
          <div class="info__picture">
            <img src="https://storage.googleapis.com/www-paredro-com/uploads/2015/08/shutterstock_188419790-e1439475344980.jpg" alt="profile image"/>
            <!--<img src="https://www.uprm.edu/natatorio/wp-content/uploads/sites/142/2018/11/profile-placeholder.png" alt="image profile">-->
          </div>
          <div class="info__data">
            <h2>{{ author.lastName }}, {{ author.firstName}}</h2>
            <h4 v-for="(org, i) of author.organizations"
                :key="i"
            >- {{ org }}
            </h4>
            <a>+ Add to collection</a>
            <div class="btn-outline">
              <button type="button">Compare Author</button>
            </div>

          </div>

        </div>
        <div class="card__metrics">
          <h3 class="metrics__title">Metrics</h3>
          <span class="metrics__subtitle">Publication Metrics</span>
          <div class="pub-metrics">
            <div class="metrics__metric"
                  v-for="(metric,i) of author.metrics"
                  :key="i"
            >
              <h3 v-if="i < 4">{{ metric.score }}</h3>
              <h4 v-if="i < 4">{{ metric.name }}</h4>
            </div>
          </div>

          <span class="metrics__subtitle">Peer Review Metrics</span>
          <div class="review-metrics">
            <div class="metrics__metric"
                 v-for="(metric,i) of author.metrics"
                 :key="i"
            >
              <h3 v-if="i >= 4">{{ metric.score }}</h3>
              <h4 v-if="i >= 4">{{ metric.name }}</h4>
            </div>
          </div>

        </div>

      </div>

      <div id="author-publications">
        <div class="publications_header"></div>
        <div class="publications__publication">
          <div class="publication__title"></div>
          <div class="publication__authors">

          </div>
          <div class="publication__info">

          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { Article} from "@/interfaces/article.interface";
import { Metric } from "@/interfaces/metric.interface";
import { Author } from "@/interfaces/author.interface";

export default Vue.extend({
  name:'author-details',
  data() {
    return {
      authorId:0,
      author:{
        id:0,
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        organizations: [] as string[],
        metrics:[] as Metric[],
        articles:[] as Article[],
      } as Author
    };
  },
  methods:{
    async getAuthorById(){
      this.authorId = parseInt(this.$route.params.authorId);
      const {data} = await axios.get(`http://localhost:3000/authors/${this.authorId}`)
      this.author = JSON.parse(JSON.stringify(data));
      //console.log(this.author)
    }
  },
  created() {
    this.getAuthorById()
  }
});
</script>

<style lang="scss" scoped>
@import "../../assets/styles/author-details-page/base-author-details.scss";
</style>
