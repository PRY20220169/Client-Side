<template>
	<main class="signup h-screen">
		<div class="grid grid-cols-2 gap-4 h-full">
			<div class="bg-main"></div>
			<div>
				<div class="flex flex-col items-center justify-center h-full">
					<div class="w-1/2 text-white">
						<h1 class="text-3xl text-start pb-8 text-gray-dark">Sign Up</h1>
						<div class="pb-3">
							<label
								for="firstName"
								class="block mb-2 text-sm font-medium text-black"
								>First Name</label
							>
							<input
								type="text"
								id="firstName"
								v-model="firstName"
								class="bg-gray-light border border-[#F2F2F4] text-black font-normal text-sm rounded-lg block w-full p-2.5"
								placeholder="John"
								required
							/>
						</div>
						<div class="pb-3">
							<label
								for="lastName"
								class="block mb-2 text-sm font-medium text-black"
								>Last Name</label
							>
							<input
								type="text"
								id="lastName"
								v-model="lastName"
								class="bg-gray-light border border-[#F2F2F4] text-black font-normal text-sm rounded-lg block w-full p-2.5"
								placeholder="Doe"
								required
							/>
						</div>
						<div class="pb-3">
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
						<div class="pb-3">
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
						<div class="pb-8">
							<label
								for="repeatPassword"
								class="block mb-2 text-sm font-medium text-black"
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
							@click="
								signUp(firstName, lastName, email, password, repeatPassword)
							"
						>
							Sign Up
						</button>
						<div class="flex items-center pb-6">
							<label class="ml-2 text-sm font-medium text-black"
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
	import axios from "axios";
	export default {
		data() {
			return {
				email: "",
				firstName: "",
				lastName: "",
				password: "",
				repeatPassword: "",
				token: "",
				userId: null,
				httpStatus: null,
				validEmail: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			};
		},
		methods: {
			async signUp(firstName, lastName, email, password, repeatPassword) {
				if (password != repeatPassword) {
					this.$swal.fire({
						icon: "error",
						title: "Passwords Don't Match",
						text: "Please Try Again",
					});
				} else if (
					password == "" ||
					firstName == "" ||
					lastName == "" ||
					email == ""
				) {
					this.$swal.fire({
						icon: "error",
						title: "There Are Empty Fields",
						text: "Please Fill In All Fields",
					});
				} else if (this.validEmail.test(email) == false) {
					this.$swal.fire({
						icon: "error",
						title: "Invalid Email Address",
						text: "Please Enter A Valid Email Address",
					});
				} else {
					try {
						const { data } = await axios.post(
							`${process.env.VUE_APP_API_URL}/security/users/register`,
							{
								username: email,
								password: password,
								firstName: firstName,
								lastName: lastName,
							}
						);
						this.httpStatus = data.httpStatus;
						if (this.httpStatus == "OK") {
							this.token = data.access_token;
							this.userId = data.id;
							this.$store.dispatch("login", {
								token: this.token,
								userId: this.userId,
							});
							this.$router.push({ name: "home" });
						} else {
							this.$swal.fire({
								icon: "error",
								title: "Our Server Failed To Respond",
								text: "Please Try Again Later",
							});
						}
					} catch (error) {
						this.$swal.fire({
							icon: "error",
							title: "Our Server Failed To Respond",
							text: "Please Try Again Later",
						});
						console.log(error);
					}
				}
			},
		},
	};
</script>

<style scoped></style>
