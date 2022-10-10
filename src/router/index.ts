import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomePage from "../pages/HomePage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	// General Routes
	{
		path: "/",
		name: "home",
		component: HomePage,
	},
	{
		path: "/login",
		name: "login",
		component: () => import("../pages/LoginPage.vue"),
		meta: {
			hideNavbar: true,
		},
	},
	{
		path: "/signup",
		name: "signup",
		component: () => import("../pages/SignupPage.vue"),
		meta: {
			hideNavbar: true,
		},
	},
	{
		path: "/advanced-search",
		name: "advanced-search",
		component: () => import("../pages/AdvancedSearch.vue"),
	},
	{
		path: "/search-results",
		name: "search-results",
		props: (route) => ({ q: route.query.q }),
		component: () => import("../pages/SearchResults.vue"),
	},

	// Collection Routes
	{
		path: "/list-collection",
		name: "list-collection",
		component: () => import("../pages/collections/ListCollection.vue"),
	},
	{
		path: "/collection/:id",
		name: "collection",
		component: () => import("../pages/collections/ArticleCollection.vue"),
	},

	// Compare Routes
	{
		path: "/compare",
		name: "compare",
		component: () => import("../pages/compare/CompareParent.vue"),
		children: [
			{
				path: "/compare",
				name: "article-compare",
				component: () => import("../pages/compare/ArticleCompare.vue"),
			},
			{
				path: "/compare/author-compare",
				name: "author-compare",
				component: () => import("../pages/compare/AuthorCompare.vue"),
			},
			{
				path: "/compare/journal-compare",
				name: "journal-compare",
				component: () => import("../pages/compare/JournalCompare.vue"),
			},
		],
	},
	// Details Routes
	{
		path: "/article-details/:id",
		name: "article-details",
		component: () => import("../pages/details/ArticleDetails.vue"),
	},
	{
		path: "/author-details/:authorId",
		name: "author-details",
		component: () => import("../pages/details/AuthorDetails.vue"),
	},
	{
		path: "/journal-details/:journalId",
		name: "journal-details",
		component: () => import("../pages/details/JournalDetails.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
});

export default router;
