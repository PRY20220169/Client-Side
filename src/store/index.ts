import Vue from "vue";
import Vuex from "vuex";
import { Article } from "@/interfaces/article.interface";
import { Author } from "@/interfaces/author.interface";


Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    articles:[] as Article[],
    authors:[] as Author[]
  },
  getters: {
    getArticles(state){
      return state.articles;
    },
    getAuthors(state){
      return state.authors;
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
    },

    addAuthor(state,author:Author){
      if(state.authors.find(e => e.id === author.id) === undefined){
        state.authors = [...state.authors,author]
      }
    },
    removeAuthor(state,author:Author){
      state.authors = state.authors.filter( e => {return e.id !== author.id})
    }
  },
  actions: {
    addArticleToCompare(context,article:Article){
      context.commit('addArticle',article)
    },
    removeArticleOfComparison(context, article:Article){
      context.commit('removeArticle',article)
    },
    addAuthorToCompare(context,author:Author){
      context.commit('addAuthor',author)
    },
    removeAuthorOfComparison(context, author:Author){
      context.commit('removeAuthor',author)
    }
  },

  modules: {},
});
