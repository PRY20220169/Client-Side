<template>
	<main class="article-details">
    <router-view ref="rv"></router-view>
    <div id="container-article" v-show="isParentActive">
      <h2>{{article.title}}</h2>
      <h3>By:
        <a v-for="(author,i) of article.authors"
           :key="i"
           @click="$router.push({name:'author-details',params:{authorId:author.id.toString()}})"
        >
          {{getNameAuthor(article.authors.length-1,i,author)}}
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
  import { Article} from "@/interfaces/article.interface";
  import Vue from "vue";
  import { Journal } from "@/interfaces/journal.interface";
  import { Author } from "@/interfaces/author.interface";

  export default Vue.extend({
    name:'article-details',

    data(){

      return{
        article: {
          authors: [],
          categories: [],
          description: "",
          id: 0,
          journal: {  } as Journal,
          journalId: 0,
          keywords: [],
          numberOfCitations: 0,
          numberOfReferences: 0,
          publicationDate: new Date(),
          title: "",
          typeArticle: "",
          volume: ""
        } as Article,
        idArticle: 0,
        isParentActive: true,
      }
    },
    methods:{
      async getArticleById(){
        this.idArticle = parseInt(this.$route.params.id);
        const {data} = await axios.get(`http://localhost:3000/article/${this.idArticle}`)
        this.article = JSON.parse(JSON.stringify(data));
        this.article.publicationDate = new Date(this.article.publicationDate)
        //console.log(this.article)
      },

      getNameAuthor(length:number,position:number,author:Author){
        if(length === position) return `and ${author.lastName}, ${author.firstName.substring(0,1)}.`
        return `${author.lastName}, ${author.firstName.substring(0,1)}.`
        //{{author.lastName}},{{author.firstName.substring(0,1)}}.
      }
    },
    updated() {
      this.isParentActive = typeof this.$refs.rv === 'undefined';
    },

    mounted() {
      this.isParentActive = typeof this.$refs.rv === 'undefined';
    },
    created() {
      this.getArticleById()
    }


    }
  )
</script>

<style lang="scss" scoped>
@import "../../assets/styles/article-details-page/base-article-details";
</style>
