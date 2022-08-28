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
            <div class="metrics__metric">
              <h3>{{ author.metrics[0].score }}</h3>
              <h4>{{ author.metrics[0].name }}</h4>
            </div>
            <div class="metrics__metric">
              <h3>{{ author.metrics[1].score }}</h3>
              <h4>{{ author.metrics[1].name }}</h4>
            </div>
            <div class="metrics__metric">
              <h3>{{ author.metrics[2].score }}</h3>
              <h4>{{ author.metrics[2].name }}</h4>
            </div>
            <div class="metrics__metric">
              <h3>{{ author.metrics[3].score }}</h3>
              <h4>{{ author.metrics[3].name }}</h4>
            </div>
          </div>
          <span class="metrics__subtitle">Peer Review Metrics</span>
          <div class="review-metrics">
            <div class="metrics__metric">
              <h3>{{ author.metrics[4].score }}</h3>
              <h4>{{ author.metrics[4].name }}</h4>
            </div>
            <div class="metrics__metric">
              <h3>{{ author.metrics[5].score }}</h3>
              <h4>{{ author.metrics[5].name }}</h4>
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
import { Author } from "@/interfaces/Article.interface";

export default Vue.extend({
  name:'author-details',
  data() {
    return {
      authorId:0,
      author:{} as Author
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
