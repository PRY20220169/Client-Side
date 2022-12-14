import Vue from "vue";
import Vuex from "vuex";
import { Article } from "@/interfaces/article.interface";
import { Author } from "@/interfaces/author.interface";
import { Journal } from "@/interfaces/journal.interface";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const getDefaultState = () => {
	return {
		articles: [] as Article[],
		authors: [] as Author[],
		journals: [] as Journal[],
		isLogged: false,
		token: "",
		userId: null,
	};
};

export default new Vuex.Store({
	plugins: [
		createPersistedState({
			// paths: ["articles", "authors", "journals"],
			storage: window.sessionStorage,
		}),
	],
	state: {
		articles: [] as Article[],
		authors: [] as Author[],
		journals: [] as Journal[],
		isLogged: false,
		token: "",
		userId: null,
		query: "",
	},
	getters: {
		getArticles(state) {
			return state.articles;
		},
		getAuthors(state) {
			return state.authors;
		},
		getJournals(state) {
			return state.journals;
		},
		getQuery(state) {
			return state.query;
		},
	},
	mutations: {
		addArticle(state, article: Article) {
			if (state.articles.find((e) => e.id === article.id) === undefined) {
				state.articles = [...state.articles, article];
			}
		},
		removeArticle(state, article: Article) {
			state.articles = state.articles.filter((e) => {
				return e.id !== article.id;
			});
		},
		addAuthor(state, author: Author) {
			if (state.authors.find((e) => e.id === author.id) === undefined) {
				state.authors = [...state.authors, author];
			}
		},
		removeAuthor(state, author: Author) {
			state.authors = state.authors.filter((e) => {
				return e.id !== author.id;
			});
		},
		addJournal(state, journal: Journal) {
			if (state.journals.find((e) => e.id === journal.id) === undefined) {
				state.journals = [...state.journals, journal];
			}
		},
		removeJournal(state, journal: Journal) {
			state.journals = state.journals.filter((e) => {
				return e.id !== journal.id;
			});
		},
		updateQuery(state, query: string) {
			state.query = query;
		},
		login(state: any, loginInfo: any) {
			state.isLogged = true;
			state.token = loginInfo.token;
			state.userId = loginInfo.userId;
		},
		logout(state) {
			Object.assign(state, getDefaultState());
			sessionStorage.clear();
		},
	},
	actions: {
		addArticleToCompare(context, article: Article) {
			context.commit("addArticle", article);
		},
		removeArticleOfComparison(context, article: Article) {
			context.commit("removeArticle", article);
		},
		addAuthorToCompare(context, author: Author) {
			context.commit("addAuthor", author);
		},
		removeAuthorOfComparison(context, author: Author) {
			context.commit("removeAuthor", author);
		},
		addJournalToCompare(context, journal: Journal) {
			context.commit("addJournal", journal);
		},
		removeJournalOfComparison(context, journal: Journal) {
			context.commit("removeJournal", journal);
		},
		updateQuery(context, query: string) {
			context.commit("updateQuery", query);
		},
		login(context: any, loginInfo: any) {
			context.commit("login", loginInfo);
		},
		logout(context) {
			context.commit("logout");
		},
	},
	modules: {},
});
