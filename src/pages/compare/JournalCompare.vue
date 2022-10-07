<template>
	<main class="journal-compare m-11">
		<h3 id="article-compare__description" class="mb-5">
			Comparing {{ journals.length }} journals
		</h3>
		<div id="journal-compare__content" class="flex space-x-10 justify-center">
			<div
				class="w-1/3 flex flex-col card border rounded-lg border-gray-light shadow-md p-5"
				v-for="(journal, i) of journals"
				:key="i"
			>
				<p class="text-2xl text-center font-regular text-black h-16">
					{{ journal.name }}
				</p>
				<p class="text-lg font-medium text-black">Metrics</p>
				<p class="text-md text-gray-dark">Publication Metrics:</p>
				<div class="flex flex-row mb-4">
					<div class="">
						<a
							:href="`https://www.scimagojr.com/journalsearch.php?q=${journal.scimagoId}&amp;tip=sid&amp;exact=no`"
							title="SCImago Journal &amp; Country Rank"
							target="_blank"
							><img
								border="0"
								:src="`https://www.scimagojr.com/journal_img.php?id=${journal.scimagoId}`"
								alt="SCImago Journal &amp; Country Rank"
						/></a>
					</div>
					<div class="w-1/2 flex flex-col justify-center ml-6">
						<li
							class="list-none"
							v-for="(metric, index) in journal.metrics"
							:key="index"
						>
							<p class="text-lg font-semibold mb-0">
								{{ metric.score }}
							</p>
							<p class="text-sm">
								{{ metric.bibliometric }}
							</p>
						</li>
					</div>
				</div>
				<p class="font-medium">Journal Details</p>
				<!-- <p class="text-sm mb-4">
					<span class="font-medium">Categories: </span>
					{{ journal.categories }}
				</p> -->
				<p class="text-sm mb-4">
					<span class="font-medium">Country: </span>
					{{ journal.country }}
				</p>
				<p class="text-sm mb-4">
					<span class="font-medium">Publisher: </span>
					{{ journal.publisher }}
				</p>
				<div
					class="w-fit border rounded-lg bg-secondary text-white text-center font-normal text-sm py-2.5 px-6 hover:cursor-pointer hover:border-secondary hover:bg-white hover:text-secondary transition ease-in-out mb-6 mx-auto"
					@click="removeJournalFromComparePage(journal)"
				>
					Remove Journal
				</div>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
	import Vue from "vue";
	export default Vue.extend({
		name: "journal-compare",
		data() {
			return {
				journals: [],
			};
		},
		methods: {
			removeJournalFromComparePage(journal: any) {
				this.$store.dispatch("removeJournalOfComparison", journal);
				this.journals = this.$store.getters.getJournals;
			},
		},
		created() {
			this.journals = this.$store.getters.getJournals;
		},
	});
</script>

<style scoped></style>
