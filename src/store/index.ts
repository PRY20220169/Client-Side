import Vue from "vue";
import Vuex from "vuex";
import { Article } from "@/interfaces/article.interface";

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    articles:[] as Article[],

  },
  getters: {
    getArticles(state){
      return state.articles;
    }
  },
  mutations: {
    addArticle(state,article:Article){
      if(state.articles.find(e => e.id === article.id) === undefined){
        state.articles = [...state.articles,article]
      }
    },
    removeArticle(state,article:Article){
      state.articles = state.articles.filter( e => {return e.id !== article.id})
    }
  },
  actions: {
    addArticleToCompare(context,article:Article){
      context.commit('addArticle',article)
    },
    removeArticleOfComparison(context, article:Article){
      context.commit('removeArticle',article)
    }
  },

  modules: {},
});
