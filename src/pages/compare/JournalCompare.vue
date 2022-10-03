<template>
	<main class="journal-compare m-11">
		<h3 id="article-compare__description" class="mb-10">
			Comparing {{ journals.length }} journals
		</h3>
		<div id="journal-compare__content" class="flex space-x-10 justify-center">
			<div
				class="w-fit flex flex-col card border rounded-lg border-gray-light shadow-md p-5"
				v-for="(journal, i) of journals"
				:key="i"
			>
				<p class="text-2xl text-center font-regular text-black">
					{{ journal.name }}
				</p>
				<p class="text-lg font-medium text-black">Metrics</p>
				<li
					class="list-none"
					v-for="(metric, index) in journal.metrics"
					:key="index"
				>
					<p class="text-sm">
						<span class="font-medium">{{ metric.name }}</span>
						{{ metric.score }}
					</p>
				</li>
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
		created() {
			this.journals = this.$store.getters.getJournals;
		},
	});
</script>

<style scoped></style>
