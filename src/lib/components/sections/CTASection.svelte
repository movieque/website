<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '../ui/Button.svelte';
	import Input from '../ui/Input.svelte';
	import { observeIntersection } from '../../utils/animations.js';

	let sectionRef: HTMLElement;
	let isVisible = $state(false);
	let email = $state('');
	let isSubmitting = $state(false);
	let isSubmitted = $state(false);
	let hasCheckedStorage = $state(false);
	let errorMessage = $state('');
	let existingEmail = $state('');
	let submissionTimestamp = $state('');
	let isEditing = $state(false);

	interface EmailData {
		email: string;
		timestamp: string;
	}

	onMount(() => {
		if (sectionRef) {
			observeIntersection(sectionRef, (visible) => {
				isVisible = visible;
			});
		}
		
		// Check for existing submission in localStorage
		checkExistingSubmission();
	});

	function checkExistingSubmission() {
		try {
			const storedData = localStorage.getItem('movieque_email_data');
			
			if (storedData) {
				const emailData: EmailData = JSON.parse(storedData);
				
				if (emailData.email && emailData.timestamp) {
					existingEmail = emailData.email;
					submissionTimestamp = emailData.timestamp;
					isSubmitted = true;
				}
			}
		} catch (error) {
			console.error('Error reading stored email data:', error);
			// If storage is corrupted, treat as new user
			localStorage.removeItem('movieque_email_data');
		}
		
		hasCheckedStorage = true;
	}

	function saveEmailData(emailData: EmailData) {
		try {
			localStorage.setItem('movieque_email_data', JSON.stringify(emailData));
		} catch (error) {
			console.error('Error saving email data:', error);
		}
	}

	function formatTimestamp(timestamp: string): string {
		try {
			const date = new Date(timestamp);
			return date.toLocaleString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
		} catch (error) {
			return 'Recently';
		}
	}

	function startEditing() {
		isEditing = true;
		email = existingEmail;
		isSubmitted = false;
	}

	function cancelEditing() {
		isEditing = false;
		email = '';
		isSubmitted = true;
	}

	async function handleSubmit() {
		if (!email || isSubmitting) return;

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			errorMessage = 'Please enter a valid email address';
			return;
		}

		isSubmitting = true;
		errorMessage = '';

		try {
			const response = await fetch('https://leads.movieque.com', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email })
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(errorText || 'Failed to submit email');
			}

			// Get the email data from response (backend returns the data directly)
			const emailData: EmailData = await response.json();
			
			// Save to localStorage
			saveEmailData(emailData);
			
			// Update component state with the exact data from backend
			existingEmail = emailData.email;
			submissionTimestamp = emailData.timestamp;
			isSubmitted = true;
			isEditing = false;
			email = '';
			
		} catch (error) {
			console.error('Submission error:', error);
			errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	}
</script>

<section 
	bind:this={sectionRef}
	class="pt-32 pb-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden"
	id="cta-section"
>
	<!-- Background Elements -->
	<div class="absolute inset-0">
		<div class="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
		<div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
	</div>

	<div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		{#if !hasCheckedStorage}
			<!-- Loading state while checking storage -->
			<div class="transition-all duration-600 ease-out opacity-50">
				<div class="animate-pulse">
					<div class="h-16 bg-gray-700 rounded mb-6 mx-auto max-w-2xl"></div>
					<div class="h-8 bg-gray-700 rounded mb-12 mx-auto max-w-3xl"></div>
					<div class="h-12 bg-gray-700 rounded mx-auto max-w-md"></div>
				</div>
			</div>
		{:else if !isSubmitted && !isEditing}
			<!-- New user - show signup form -->
			<!-- Main CTA Content -->
			<div class="transition-all duration-600 ease-out" 
				 class:opacity-0={!isVisible} 
				 class:opacity-100={isVisible}
				 class:translate-y-8={!isVisible}
				 class:translate-y-0={isVisible}>
				<h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
					Ready to Transform Your
					<span class="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
						Movie Nights?
					</span>
				</h2>
				<p class="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
					Join thousands of movie lovers who've already discovered their new favorite way to find films
				</p>
			</div>

			<!-- Beta Signup Form -->
			<div class="max-w-md mx-auto mb-12 transition-all duration-600 ease-out" 
				 class:opacity-0={!isVisible} 
				 class:opacity-100={isVisible}
				 class:translate-y-8={!isVisible}
				 class:translate-y-0={isVisible}
				 style="transition-delay: 200ms;">
				<div class="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
					<h3 class="text-2xl font-bold text-white mb-6">Get Early Access</h3>
					
					<div class="space-y-4">
						<Input
							type="email"
							placeholder="Enter your email address"
							bind:value={email}
							onkeypress={handleKeyPress}
							class="text-center"
						/>
						
						{#if errorMessage}
							<p class="text-red-400 text-sm">{errorMessage}</p>
						{/if}
						
						<div class="flex space-x-3">
							<Button
								variant="primary"
								size="lg"
								onclick={handleSubmit}
								loading={isSubmitting}
								disabled={!email || isSubmitting}
								class="flex-1 gradient-animation"
							>
								{#snippet children()}
									{#if isSubmitting}
										Joining Beta...
									{:else}
										Join the Beta
									{/if}
									<svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
									</svg>
								{/snippet}
							</Button>
						</div>
					</div>

					<p class="text-gray-400 text-sm mt-4">
						No spam, ever. Unsubscribe anytime.
					</p>
				</div>
			</div>

			<!-- Social Proof -->
			<div class="transition-all duration-600 ease-out" 
				 class:opacity-0={!isVisible} 
				 class:opacity-100={isVisible}
				 class:translate-y-8={!isVisible}
				 class:translate-y-0={isVisible}
				 style="transition-delay: 400ms;">
				<div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
					<!-- User Avatars -->
					<div class="flex items-center space-x-4">
						<div class="flex -space-x-2">
							{#each Array(8) as _, i}
								<div class="w-10 h-10 bg-gradient-to-r from-red-500 to-blue-500 rounded-full border-2 border-gray-900 flex items-center justify-center text-white text-sm font-semibold">
									{String.fromCharCode(65 + i)}
								</div>
							{/each}
						</div>
						<div class="text-left">
							<div class="text-white font-semibold">1,000+ early users</div>
							<div class="text-gray-400 text-sm">already discovering</div>
						</div>
					</div>

					<!-- Stats -->
					<div class="flex space-x-6 text-center">
						<div>
							<div class="text-2xl font-bold text-red-500">4.9★</div>
							<div class="text-gray-400 text-sm">Beta rating</div>
						</div>
						<div>
							<div class="text-2xl font-bold text-blue-500">30s</div>
							<div class="text-gray-400 text-sm">Avg. discovery</div>
						</div>
					</div>
				</div>

				<!-- Features Highlight -->
				<div class="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
					<div class="flex items-center justify-center space-x-2 text-gray-300">
						<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
						</svg>
						<span class="text-sm">TikTok-style discovery</span>
					</div>
					<div class="flex items-center justify-center space-x-2 text-gray-300">
						<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
						</svg>
						<span class="text-sm">Instant streaming access</span>
					</div>
					<div class="flex items-center justify-center space-x-2 text-gray-300">
						<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
						</svg>
						<span class="text-sm">Built-in VPN solution</span>
					</div>
				</div>
			</div>
		{:else if isSubmitted && !isEditing}
			<!-- Existing user - show current status with option to change -->
			<div class="transition-all duration-600 ease-out" 
				 class:opacity-0={!isVisible} 
				 class:opacity-100={isVisible}
				 class:translate-y-8={!isVisible}
				 class:translate-y-0={isVisible}>
				<div class="max-w-lg mx-auto">
					<!-- Current Status Card -->
					<div class="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-8">
						<div class="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
							<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
							</svg>
						</div>
						
						<h3 class="text-2xl font-bold text-white mb-4">You're on the list!</h3>
						<p class="text-gray-300 mb-6">
							We'll notify you as soon as MovieQue beta spots open up.
						</p>
						
						<!-- Email Details -->
						<div class="bg-gray-800/50 border border-gray-600/30 rounded-xl p-4 mb-6">
							<div class="text-sm text-gray-400 mb-1">Early Access Email:</div>
							<div class="text-white font-medium text-lg mb-2">{existingEmail}</div>
							<div class="text-xs text-gray-500">
								Registered {formatTimestamp(submissionTimestamp)}
							</div>
						</div>
						
						<!-- Change Email Button -->
						<Button
							variant="secondary"
							size="lg"
							onclick={startEditing}
							class="w-full"
						>
							{#snippet children()}
								<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
								</svg>
								Change Email Address
							{/snippet}
						</Button>
					</div>
					
					<!-- Additional Info -->
					<div class="text-center">
						<p class="text-gray-400 text-sm mb-4">
							Keep an eye on your inbox for exclusive updates and early access invites.
						</p>
						
						<!-- Mini Features -->
						<div class="flex items-center justify-center space-x-6 text-sm">
							<div class="flex items-center space-x-2 text-gray-300">
								<svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<span>Priority Access</span>
							</div>
							<div class="flex items-center space-x-2 text-gray-300">
								<svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<span>Exclusive Updates</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		{:else if isEditing}
			<!-- Edit mode - show update form -->
			<div class="transition-all duration-600 ease-out" 
				 class:opacity-0={!isVisible} 
				 class:opacity-100={isVisible}
				 class:translate-y-8={!isVisible}
				 class:translate-y-0={isVisible}>
				<h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
					Update Your
					<span class="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
						Early Access
					</span>
				</h2>
				<p class="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
					Change your email address for MovieQue beta notifications
				</p>
			</div>

			<!-- Update Form -->
			<div class="max-w-md mx-auto mb-12 transition-all duration-600 ease-out" 
				 class:opacity-0={!isVisible} 
				 class:opacity-100={isVisible}
				 class:translate-y-8={!isVisible}
				 class:translate-y-0={isVisible}
				 style="transition-delay: 200ms;">
				<div class="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
					<h3 class="text-2xl font-bold text-white mb-2">Update Email Address</h3>
					<p class="text-gray-400 text-sm mb-6">Currently registered: {existingEmail}</p>
					
					<div class="space-y-4">
						<Input
							type="email"
							placeholder="Enter your new email address"
							bind:value={email}
							onkeypress={handleKeyPress}
							class="text-center"
						/>
						
						{#if errorMessage}
							<p class="text-red-400 text-sm">{errorMessage}</p>
						{/if}
						
						<div class="flex space-x-3">
							<Button
								variant="primary"
								size="lg"
								onclick={handleSubmit}
								loading={isSubmitting}
								disabled={!email || isSubmitting}
								class="flex-1 gradient-animation"
							>
								{#snippet children()}
									{#if isSubmitting}
										Updating...
									{:else}
										Update Email
									{/if}
									<svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
								{/snippet}
							</Button>
							
							<Button
								variant="secondary"
								size="lg"
								onclick={cancelEditing}
								disabled={isSubmitting}
								class="px-6"
							>
								{#snippet children()}
									Cancel
								{/snippet}
							</Button>
						</div>
					</div>

					<p class="text-gray-400 text-sm mt-4">
						No spam, ever. Unsubscribe anytime.
					</p>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	@keyframes gradient-shift {
		0% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
		100% { background-position: 0% 50%; }
	}
</style>