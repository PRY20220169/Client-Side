<template>
	<main class="login h-screen">
		<div class="grid grid-cols-2 gap-4 h-full">
			<div class="bg-main"></div>
			<div>
				<div class="flex flex-col items-center justify-center h-full">
					<div class="w-1/2 text-white">
						<h1 class="text-3xl text-start pb-8 text-gray-dark">Login</h1>
						<div class="pb-8">
							<label
								for="email"
								class="block mb-2 text-sm font-medium text-black"
								>Email Address</label
							>
							<input
								type="text"
								id="email"
								v-model="email"
								class="bg-gray-light border border-[#F2F2F4] text-black font-normal text-sm rounded-lg block w-full p-2.5"
								placeholder="name@email.com"
								required
							/>
						</div>
						<div class="pb-5">
							<label
								for="password"
								class="block mb-2 text-sm font-medium text-black"
								>Password</label
							>
							<input
								type="password"
								id="password"
								v-model="password"
								class="bg-gray-light border border-[#F2F2F4] text-black font-normal text-sm rounded-lg block w-full p-2.5"
								placeholder="********************"
								required
							/>
						</div>
						<div class="flex items-center pb-6">
							<input
								checked
								id="checked-checkbox"
								type="checkbox"
								value=""
								class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-black"
							/>
							<label
								for="checked-checkbox"
								class="ml-2 text-sm font-medium text-black"
								>Remember Password</label
							>
						</div>
						<button
							type="button"
							class="bg-main text-white font-normal text-sm rounded-lg block w-full p-2.5 hover:brightness-90 transition ease-in-out mb-6"
							@click="login(email, password)"
						>
							Login
						</button>
						<div class="flex items-center pb-6">
							<label class="ml-2 text-sm font-medium text-black"
								>Don't have an account?</label
							>
							<router-link
								class="ml-2 text-sm font-medium text-main"
								to="/signup"
								>Sign up</router-link
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
	export default {
		data() {
			return {
				email: "",
				password: "",
			};
		},
		methods: {
			login(email, password) {
				this.$store.dispatch("login", {
					token: "11arstxcvarstarswf21245689tar",
				});
				this.$router.push({ name: "home" });
			},
		},
	};
</script>

<style></style>
