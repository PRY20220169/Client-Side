<template>
	<article class="sc-article">
		<div class="num-article">
			<div class="check"></div>
			<span>{{ document.id + 1 }}</span>
		</div>
		<div class="info-article">
			<a @click="$router.push(`/article-details/${document.id}`)">
				<h5
					class="inline-block underline cursor-pointer transition ease-in-out"
				>
					{{ document.title }}
				</h5>
			</a>
			<h6>
				<a
					class="underline"
					v-for="(author, i) of document.authors"
					:key="i"
					@click="$router.push(`/author-details/${author.id}`)"
				>
					<p
						class="inline-block underline cursor-pointer transition ease-in-out mb-0"
					>
						{{ getNameAuthor(document.authors.length - 1, i, author) }}
					</p>
				</a>
			</h6>
			<span class="flex"
				>{{ document.publicationDate.toLocaleString("EN", { month: "long" }) }}
				{{ document.publicationDate.getFullYear() }} |
				<p
					class="inline-block underline cursor-pointer text-main transition ease-in-out ml-2"
					@click="$router.push(`/journal-details/${document.journal.id}`)"
				>
					{{ document.journal.name }}
				</p>
				{{ document.volume }}</span
			>
			<p>
				{{ document.description }}
			</p>
		</div>
		<div class="bb-data-article">
			<div
				class="metadata-art"
				v-for="(metric, i) of document.journal.metrics"
				:key="i"
			>
				<div class="metadata-type">
          <a
              class="text-main mb-4"
              :href="`https://www.scimagojr.com/journalsearch.php?q=${document.journal.scimagoId}&tip=sid&clean=0`"
              target="_blank"
          >
            <div class="flex items-center">
              <h2 class="mr-2">{{ metric.score }}</h2>
              <i class="bx bx-link-external"></i>
            </div>
          </a>
				</div>

				<div class="mt-n4">
					<h5>{{ metric.name }}</h5>
					<h6>From {{ metric.source }}</h6>
				</div>
				<hr />
			</div>
		</div>
	</article>
</template>

<script lang="ts">
	import { Article } from "@/interfaces/article.interface";
	import { PropType } from "vue";
	import { Author } from "@/interfaces/author.interface";

	export default {
		name: "pub-article",
		props: {
			document: {
				type: Object as PropType<Article>,
				required: true,
			},
		},
		methods: {
			getNameAuthor(length: number, position: number, author: Author) {
				if (length === position)
					return `and ${author.lastName}, ${author.firstName.substring(0, 1)}.`;
				return `${author.lastName}, ${author.firstName.substring(0, 1)}.`;
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "../assets/styles/search-results-page/articles-search-rs";
</style>
