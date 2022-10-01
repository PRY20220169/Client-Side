<template>
	<main class="list-collection">
		<div class="w-full h-full p-6 flex flex-col">
			<h1 class="text-2xl font-medium mb-5">Collections</h1>
			<div class="flex justify-between bg-main-light rounded-xl p-5 text-white">
				<input
					type="text"
					id="search-collection"
					class="bg-gray-light border border-[#F2F2F4] font-normal text-sm rounded-lg p-2.5"
					placeholder="Type your search terms"
					required
				/>
				<div class="flex space-x-4">
					<button
						@click="createCollection()"
						type="button"
						class="bg-main text-white font-normal text-sm rounded-lg p-2 px-6 hover:brightness-90 transition ease-in-out"
					>
						New Collection
					</button>
					<button
						@click="deleteCollections()"
						type="button"
						class="bg-secondary text-white font-normal text-sm rounded-lg p-2 px-6 hover:brightness-90 transition ease-in-out"
					>
						Delete Collection
					</button>
				</div>
			</div>
			<v-data-table
				v-model="selected"
				:headers="headers"
				:items="collections"
				:items-per-page="5"
				item-key="id"
				show-select
				class="elevation-1"
			>
				<template v-slot:[`item.name`]="{ item }">
					<p
						class="text-main hover:cursor-pointer"
						@click="openCollection(item)"
					>
						{{ item.name }}
					</p>
				</template>
				<template v-slot:[`item.actions`]="props">
					<v-edit-dialog :return-value.sync="props.item.name">
						<v-icon small class="mr-2"> mdi-pencil </v-icon>
						<template v-slot:input>
							<div class="mt-4 text-lg">Update Name</div>
							<v-text-field
								v-model="props.item.name"
								autofocus
								@keyup.enter="editItem(props.item)"
							></v-text-field>
						</template>
					</v-edit-dialog>
				</template>
			</v-data-table>
		</div>
	</main>
</template>

<script>
	import router from "@/router";
	export default {
		watch: {
			dialog(val) {
				val || this.close();
			},
			dialogDelete(val) {
				val || this.closeDelete();
			},
		},
		data() {
			return {
				selected: [],
				headers: [
					{
						text: "Name",
						align: "start",
						sortable: true,
						value: "name",
					},
					{
						text: "Last Modified",
						align: "start",
						sortable: true,
						value: "lastModified",
					},
					{
						text: "N. of Articles",
						align: "start",
						sortable: true,
						value: "numberOfArticles",
					},
					{
						text: "Actions",
						align: "start",
						sortable: false,
						value: "actions",
					},
				],
				collections: [
					{
						id: 1,
						name: "Bibliometrics Research - UPC",
						lastModified: "15-09-2022",
						numberOfArticles: 10,
					},
					{
						id: 2,
						name: "Academic Research - PUCP",
						lastModified: "10-09-2022",
						numberOfArticles: 15,
					},
					{
						id: 3,
						name: "Conference Paper IEEE",
						lastModified: "22-10-2022",
						numberOfArticles: 30,
					},
				],
			};
		},
		methods: {
			openCollection(item) {
				router.push({ name: "collection", params: { id: item.id } });
			},
			editItem(item) {
				//TODO: Send PUT request to API
			},
			createCollection() {
				//TODO: Send POST request to API
				var utc = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
				this.collections.unshift({
					name: "New Collection",
					lastModified: utc.toString(),
					numberOfArticles: 0,
				});
			},
			deleteCollections() {
				//TODO: Send DELETE request to API
				this.collections = this.collections.filter(
					(item) => !this.selected.includes(item)
				);
			},
		},
	};
</script>

<style></style>
