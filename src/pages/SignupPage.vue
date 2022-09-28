<template>
	<main class="signup h-screen">
		<div class="grid grid-cols-2 gap-4 h-full">
			<div class="bg-main"></div>
			<div>
				<div class="flex flex-col items-center justify-center h-full">
					<div class="w-1/2">
						<h1 class="text-3xl text-start pb-8 text-gray-dark">Sign Up</h1>
						<div class="pb-3">
							<label
								for="fullName"
								class="block mb-2 text-sm font-medium text-gray-900"
								>Full Name</label
							>
							<input
								type="text"
								id="fullName"
								v-model="fullName"
								class="bg-gray-light border border-[#F2F2F4] text-black font-normal text-sm rounded-lg block w-full p-2.5"
								placeholder="John Doe"
								required
							/>
						</div>
						<div class="pb-3">
							<label
								for="email"
								class="block mb-2 text-sm font-medium text-gray-900"
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
						<div class="pb-3">
							<label
								for="password"
								class="block mb-2 text-sm font-medium text-gray-900"
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
						<div class="pb-8">
							<label
								for="repeatPassword"
								class="block mb-2 text-sm font-medium text-gray-900"
								>Repeat Password</label
							>
							<input
								type="password"
								id="repeatPassword"
								v-model="repeatPassword"
								class="bg-gray-light border border-[#F2F2F4] text-black font-normal text-sm rounded-lg block w-full p-2.5"
								placeholder="********************"
								required
							/>
						</div>
						<button
							type="button"
							class="bg-main text-white font-normal text-sm rounded-lg block w-full p-2.5 hover:brightness-90 transition ease-in-out mb-6"
							@click="signUp(fullName, email, password, repeatPassword)"
						>
							Sign Up
						</button>
						<div class="flex items-center pb-6">
							<label class="ml-2 text-sm font-medium text-gray-900"
								>Already have an account?</label
							>
							<router-link
								class="ml-2 text-sm font-medium text-main"
								to="/login"
								>Login Here</router-link
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
				fullName: "",
				password: "",
				repeatPassword: "",
			};
		},
		methods: {
			signUp(fullName, email, password, repeatPassword) {
				if (password != repeatPassword) {
					alert("Password doesn't match");
				} else {
					this.$store.dispatch("signUp", {
						fullName,
						email,
						password,
					});
					this.$router.push({ name: "home" });
				}
			},
		},
	};
</script>

<style></style>
