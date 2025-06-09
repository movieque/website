<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '../ui/Button.svelte';
	import PhoneMockup from '../animations/PhoneMockup.svelte';
	import { observeIntersection } from '../../utils/animations.js';
	import { fade, fly } from 'svelte/transition';

	let heroRef: HTMLElement;
	let isVisible = $state(false);

	onMount(() => {
		if (heroRef) {
			observeIntersection(heroRef, (visible) => {
				isVisible = visible;
			});
		}
	});

	function handleJoinBeta() {
		// Scroll to CTA section
		const ctaSection = document.getElementById('cta-section');
		if (ctaSection) {
			ctaSection.scrollIntoView({ behavior: 'smooth' });
		}
	}

	function handleWatchDemo() {
		// For now, just scroll to features
		const featuresSection = document.getElementById('features-section');
		if (featuresSection) {
			featuresSection.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<section 
	bind:this={heroRef}
	class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
	id="hero-section"
>
	<!-- Background Elements -->
	<div class="absolute inset-0 overflow-hidden">
		<!-- Animated gradient orbs -->
		<div class="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
		<div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
		
		<!-- Grid pattern -->
		<div class="absolute inset-0 opacity-50" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.02&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-12 items-center">
			<!-- Content Column -->
			<div class="text-center lg:text-left">
				{#if isVisible}
					<div class="space-y-8" in:fly={{ y: 20, duration: 600, delay: 200 }}>
						<!-- Main Headline -->
						<h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
							<span class="text-white">Stop Endless</span>
							<br>
							<span class="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
								Scrolling,
							</span>
							<br>
							<span class="text-white">Start</span>
							<span class="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
								Discovering
							</span>
						</h1>

						<!-- Subheadline -->
						<p class="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
							Swipe through movie clips like TikTok, get instant access to watch on your favorite streaming platform
						</p>

						<!-- Stats -->
						<div class="flex flex-wrap justify-center lg:justify-start gap-8 text-center">
							<div>
								<div class="text-2xl font-bold text-white">10min</div>
								<div class="text-sm text-gray-400">Average Netflix scroll</div>
							</div>
							<div>
								<div class="text-2xl font-bold text-red-500">3sec</div>
								<div class="text-sm text-gray-400">MovieQue decision</div>
							</div>
							<div>
								<div class="text-2xl font-bold text-blue-500">1000+</div>
								<div class="text-sm text-gray-400">Beta users</div>
							</div>
						</div>

						<!-- CTA Buttons -->
						<div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
							<Button 
								variant="primary" 
								size="lg" 
								onclick={handleJoinBeta}
								class="gradient-animation"
							>
								{#snippet children()}
									Join the Beta
									<svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
									</svg>
								{/snippet}
							</Button>
							
							<Button 
								variant="outline" 
								size="lg" 
								onclick={handleWatchDemo}
							>
								{#snippet children()}
									<svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5H9m0-5a1.5 1.5 0 011.5-1.5H12"></path>
									</svg>
									Watch Demo
								{/snippet}
							</Button>
						</div>

						<!-- Social Proof -->
						<div class="flex items-center justify-center lg:justify-start space-x-4 text-sm text-gray-400">
							<div class="flex -space-x-2">
								{#each Array(5) as _, i}
									<div class="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-500 rounded-full border-2 border-gray-900 flex items-center justify-center text-white text-xs font-semibold">
										{String.fromCharCode(65 + i)}
									</div>
								{/each}
							</div>
							<span>Join 1,000+ movie lovers in early access</span>
						</div>
					</div>
				{/if}
			</div>

			<!-- Phone Mockup Column -->
			<div class="flex justify-center lg:justify-end">
				{#if isVisible}
					<div in:fly={{ y: 20, duration: 600, delay: 400 }}>
						<PhoneMockup class="transform hover:scale-105 transition-transform duration-500" />
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Scroll Indicator -->
	<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
		<div class="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
			<div class="w-1 h-3 bg-gradient-to-b from-red-500 to-blue-500 rounded-full mt-2 animate-pulse"></div>
		</div>
	</div>
</section>

<style>
	@keyframes gradient-shift {
		0% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
		100% { background-position: 0% 50%; }
	}
</style>