<template>
	<main class="article-details">
    <div id="container-article">
      <h2>{{article.title}}</h2>
      <h3>By:
        <a v-for="(author,i) of article.authors"
           :key="i"
        >
          {{author.lastName}},{{author.firstName}}
        </a>
      </h3>
      <a>+ Add to Collection</a>
      <div class="btn-outline">
        <button type="button">Compare articles</button>
      </div>

      <div id="article-journal">
        <span>{{article.journal.name}}</span>
        <div id="journal-details">
          <div>Volume: <h3>{{article.volume}}</h3></div>
          <div>DOI: <h3>10.1016/j.cmpb.2010.10.003</h3></div>
          <div>Published: <h3>{{article.publicationDate.toLocaleString('EN', { month: 'long' })}} {{article.publicationDate.getFullYear()}}</h3></div>
          <div>Document Type: <h3>{{article.typeArticle}}</h3></div>
        </div>
      </div>

      <h3>Abstract</h3>
      <p>{{article.description}}</p>




    </div>
  </main>
</template>

<script lang="ts">
	import axios from "axios";
  import { Article } from "@/interfaces/Article.interface";
  import Vue from "vue";

  export default Vue.extend({
    name:'article-details',

    data(){
      return{
        article: {} as Article,
        idArticle: 0,
      }
    },
    methods:{
      async getArticleById(){
        const {data} = await axios.get(`http://localhost:3000/article/${this.idArticle}`)
        this.article = JSON.parse(JSON.stringify(data));
        this.article.publicationDate = new Date(this.article.publicationDate)
        //console.log(this.article)
      }
    },
    mounted() {
      this.idArticle = parseInt(this.$route.params.id);
      this.getArticleById()
    },


  }
  )
</script>

<style lang="scss">
@import "../../assets/styles/article-details-page/base-article-details";
</style>
