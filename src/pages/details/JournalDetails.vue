<template>
	<main class="journal-details m-10">
		<h1 class="text-3xl font-medium mb-10">Journal Details</h1>
		<div class="flex space-x-10">
			<div class="row-left w-7/12">
				<div
					class="flex flex-col card border rounded-lg border-gray-light shadow-md p-5"
				>
					<p class="text-2xl text-center font-regular">{{ journal.name }}</p>
					<p class="text-lg font-medium">Metrics</p>
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
			<div class="row-right w-full">
				<p class="font-medium">Journal Scope</p>
				<div class="card border rounded-lg border-gray-light shadow-md p-5">
					{{ journal.name }}
				</div>
			</div>
		</div>
	</main>
</template>

<script>
	import axios from "axios";
	export default {
		data() {
			return {
				journal: {
					id: null,
					name: "",
					metrics: [
						{
							id: null,
							name: "",
							score: "",
							year: null,
							source: "",
						},
					],
				},
			};
		},
		methods: {
			async getJournalDetailsById() {
				const { data } = await axios.get(
					`${process.env.VUE_APP_API_URL}/journals/${this.$route.params.journalId}`
				);
				this.journal = data;
			},
		},
		created() {
			this.getJournalDetailsById();
		},
	};
</script>

<style></style>
