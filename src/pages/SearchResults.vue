<template>
  <main class="search-results">
    <nav id="nav-bar">
      <h3>{{filteredDocuments.length}} resultados de su búsqueda</h3>
      <div class="nav-actions">
        <div class="search-bar">
          <i class="bx bx-search-alt-2"></i>
          <input type="text" placeholder="Bibliometrics, scientific, workflow" v-model="qsearch">
        </div>
        <div id="search-buttons">
          <div class="btn-content">
            <button type="button">Advanced Search</button>
          </div>
          <div class="btn-content"
               @click="filterDocuments">
            <button type="button">Edit filters</button>
          </div>
        </div>
      </div>
    </nav>
    <div id="search-results-content">
      <aside id="aside">

        <div class="filter-block"
             v-for="(category, i) of filters"
             :key="i"
        >
          <h3>{{ category.title }}</h3>
          <div class="filter-options">
            <div class="option-check"
                 v-for="(option, i) of category.options"
                 :class="{checked:option.checked}"
                 :key="i"
            >
              <div class="check"
                   @click="
                   handlerFilterOptions(category.categoryType,option.name,option.checked)
                   option.checked = !option.checked;"
              >
                <i class="bx check-icon"
                   :class="{'bx-check': option.checked}"
                ></i>
              </div>
              <h4>{{ option.name }}</h4>
            </div>
          </div>

        </div>

      </aside>

      <section id="content-section">
        <pub-article v-for="(doc, i) of filteredDocuments"
                     :key="i"
                     :document="doc"
        ></pub-article>
      </section>
    </div>


  </main>
</template>

<script lang="ts">
import PubArticle from "@/components/pub-article.vue";
import axios from "axios";
import Vue from "vue";

import { Article } from "@/interfaces/article.interface";

export default Vue.extend({
  components: { PubArticle },
  data() {
    return {
      filters: [
        {
          title: "Año de publicación",
          categoryType: "Year",
          options: [
            { name: "2022", checked: false },
            { name: "2021", checked: false },
            { name: "2020", checked: false },
            { name: "2019", checked: false }]
        },
        {
          title: "Tipo de documento",
          categoryType: "Type",
          options: [
            { name: "Article", checked: false },
            { name: "Conference", checked: false },
            { name: "Composium", checked: false }]
        },
        {
          title: "Quartil",
          categoryType: "Quartile",
          options: [
            { name: "Q1", checked: false },
            { name: "Q2", checked: false }]
        }
      ],
      documents: [] as Article[],
      filteredDocuments: [] as Article[],
      filterOptions: {
        years:[] as string[],
        types:[] as string[],
        quartiles:[] as string[],
      },
      qsearch:""
    };
  },
  methods: {
    async getDocuments() {
      const {data} = await axios.get("http://localhost:3000/article");

      this.documents = JSON.parse(JSON.stringify(data));
      this.filteredDocuments = JSON.parse(JSON.stringify(data));


      this.documents.map(item => {
        item.publicationDate = new Date(item.publicationDate)
      })

      this.filteredDocuments.map(item => {
        item.publicationDate = new Date(item.publicationDate)
      })

    },

    filterDocuments() {
      /*this.filterState2.years = this.filterState[0].options;
      this.filterState2.types = this.filterState[1].options;
      this.filterState2.quartiles = this.filterState[2].options;*/
      const {years,types,quartiles} = this.filterOptions;

      this.filteredDocuments = this.documents.filter((article) =>{
        const quartile = article.journal.metrics[0].score //osea sy quartil

        return ((years.length > 0)? years.map( e => {return e}).includes(article.publicationDate.getFullYear().toString() ): true) &&
          ((types.length > 0)? types.map( e => {return e}).includes(article.typeArticle): true) &&
          ((quartiles.length > 0)? quartiles.map( e => {return e}).includes(quartile): true)
      })

    },


    /*filterDocumentsByQuartile() {
      const quartile = this.filterState[2].options;
      if (quartile.length > 0) {
        this.filteredDocuments = this.documents.filter((el) => {
          return quartile.map((sel) => {
            return sel;
          }).includes(el.journal.quartile);
        });
      }

    },*/


    handlerFilterOptions(category: string, option: string, checked: boolean) {
      if (checked) {
        this.removeFilterOption(category, option);
        //console.log(this.filterState)
      } else {
        this.addFilterOption(category, option);
      }
      //console.log(this.filterOptions)

      this.filterDocuments();
    },
    // eslint-disable-next-line
    addFilterOption(category: string, option: any) {

      switch (category){
        case "Year": this.filterOptions.years.push(option);break;
        case "Type": this.filterOptions.types.push(option);break;
        case "Quartile": this.filterOptions.quartiles.push(option);break;
      }
      console.log(this.filterOptions.years)


    },
    // eslint-disable-next-line
    removeFilterOption(category: string, option: any) {
      switch (category){
        case "Year":
          this.filterOptions.years = this.filterOptions.years.filter(opt => {
            return opt != option;
          });break;
        case "Type":
          this.filterOptions.types = this.filterOptions.types.filter(opt => {
            return opt != option;
          });break;
        case "Quartile":
          this.filterOptions.quartiles = this.filterOptions.quartiles.filter(opt => {
            return opt != option;
          });break;
      }

    }


  },
  created() {
    this.getDocuments();
  },
  mounted() {
    this.qsearch = this.$route.query.q as string;
  }
});
</script>

<style scoped lang="scss">
@import "../assets/styles/search-results-page/base-search-rs-page";
</style>
