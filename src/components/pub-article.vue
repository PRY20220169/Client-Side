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
      <div
          class="flex items-center w-fit border rounded-lg bg-main text-white text-center font-normal text-sm py-2.5 px-6 hover:cursor-pointer hover:brightness-75 transition ease-in-out"
          @click="getCitationFromArticle(document)"
      >
        <img src="../assets/icons/quote.svg" alt="" class="ml-n1 mr-3" />
        Copy Citation to Clipboard
      </div>
		</div>
		<div class="bb-data-article">
			<div
				class="metadata-art"
				v-for="(metric, i) of document.journal.metrics"
				:key="i"
			>
				<div class="metadata-type">
					<h2>{{ metric.score }}</h2>
					<i class="bx bx-link-external"></i>
				</div>

				<div>
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
  import Vue from "vue";
  import axios from "axios";

	export default Vue.extend ({
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
      async getCitationFromArticle(article: any) {
        try {
          let { data } = await axios.get(
              `${process.env.VUE_APP_API_URL}/api/articles/${article.id}/reference`
          );
          await navigator.clipboard.writeText(data.reference);
          this.$swal.fire({
            icon: "success",
            title: "Citation Copied To Clipboard",
            showConfirmButton: false,
            timer: 1000,
          });
        } catch (error) {
          this.$swal.fire({
            icon: "error",
            title: "Could Not Copy Citation",
            text: "Please Try Again Later",
          });
        }
      },
		},
	});
</script>

<style lang="scss" scoped>
	@import "../assets/styles/search-results-page/articles-search-rs";
</style>
