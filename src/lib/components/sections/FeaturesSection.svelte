<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '../ui/Card.svelte';
	import { FEATURES } from '../../utils/constants.js';
	import { observeIntersection } from '../../utils/animations.js';

	let sectionRef: HTMLElement;
	let isVisible = $state(false);

	onMount(() => {
		if (sectionRef) {
			observeIntersection(sectionRef, (visible) => {
				isVisible = visible;
			});
		}
	});
</script>

<section 
	bind:this={sectionRef}
	class="py-20 bg-gradient-to-b from-black to-gray-900"
	id="features-section"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="text-center mb-16 transition-opacity duration-600 ease-out" class:opacity-0={!isVisible} class:opacity-100={isVisible}>
			<h2 class="text-4xl sm:text-5xl font-bold text-white mb-6">
				Three Problems
				<span class="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
					Every Movie Lover
				</span>
				Faces
			</h2>
			<p class="text-xl text-gray-300 max-w-3xl mx-auto">
				We've identified the biggest frustrations in movie discovery and built the perfect solution
			</p>
		</div>

		<!-- Features Grid -->
		<div class="grid md:grid-cols-3 gap-8">
			{#each FEATURES as feature, index}
				<div class="transition-all duration-600 ease-out" 
					 class:opacity-0={!isVisible} 
					 class:opacity-100={isVisible}
					 class:translate-y-8={!isVisible}
					 class:translate-y-0={isVisible}
					 style="transition-delay: {200 + (index * 150)}ms;">
					<Card variant="feature" class="p-8 h-full text-center group">
						<!-- Animated Icon -->
						<div class="mb-6 flex justify-center">
							<div class="relative">
								{#if feature.icon === 'scroll'}
									<!-- Endless Scroll Animation -->
									<div class="w-16 h-16 bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
										<div class="scroll-animation">
											<div class="w-8 h-12 border-2 border-gray-400 rounded-lg relative overflow-hidden">
												<div class="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-gradient-to-b from-red-500 to-blue-500 rounded-full animate-bounce"></div>
											</div>
										</div>
									</div>
								{:else if feature.icon === 'search'}
									<!-- AI Search Animation -->
									<div class="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-red-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
										<div class="relative">
											<svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
											</svg>
											<div class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
										</div>
									</div>
								{:else if feature.icon === 'globe'}
									<!-- VPN Globe Animation -->
									<div class="w-16 h-16 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
										<div class="relative">
											<svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
											</svg>
											<div class="absolute inset-0 border-2 border-blue-400 rounded-full animate-pulse"></div>
										</div>
									</div>
								{/if}
							</div>
						</div>

						<!-- Feature Content -->
						<h3 class="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-blue-500 group-hover:bg-clip-text transition-all duration-300">
							{feature.title}
						</h3>
						<p class="text-gray-300 leading-relaxed">
							{feature.description}
						</p>

						<!-- Problem Indicator -->
						<div class="mt-6 flex items-center justify-center space-x-2">
							<div class="w-2 h-2 bg-red-500 rounded-full"></div>
							<span class="text-sm text-red-400 font-medium">Problem #{index + 1}</span>
						</div>
					</Card>
				</div>
			{/each}
		</div>

		<!-- Solution Highlight -->
		<div class="mt-16 text-center transition-all duration-600 ease-out" 
			 class:opacity-0={!isVisible} 
			 class:opacity-100={isVisible}
			 class:translate-y-8={!isVisible}
			 class:translate-y-0={isVisible}
			 style="transition-delay: 800ms;">
			<div class="inline-flex items-center space-x-3 bg-gradient-to-r from-red-500/10 to-blue-500/10 border border-red-500/20 rounded-full px-8 py-4">
				<div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
				<span class="text-lg font-semibold text-white">
					<span class="text-red-500">Movie</span><span class="text-blue-500">Que</span> solves all three
				</span>
				<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
				</svg>
			</div>
		</div>
	</div>
</section>

<style>
	.scroll-animation {
		animation: scroll-bounce 2s ease-in-out infinite;
	}

	@keyframes scroll-bounce {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-4px); }
	}
</style>