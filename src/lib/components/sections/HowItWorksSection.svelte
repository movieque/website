<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '../ui/Card.svelte';
	import { HOW_IT_WORKS_STEPS } from '../../utils/constants.js';
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
	class="py-20 pb-32 bg-gradient-to-b from-gray-900 to-black"
	id="how-it-works-section"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="text-center mb-16 transition-all duration-600 ease-out" 
			 class:opacity-0={!isVisible} 
			 class:opacity-100={isVisible}
			 class:translate-y-8={!isVisible}
			 class:translate-y-0={isVisible}>
			<h2 class="text-4xl sm:text-5xl font-bold text-white mb-6">
				From Swipe to
				<span class="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
					Stream
				</span>
				in Seconds
			</h2>
			<p class="text-xl text-gray-300 max-w-3xl mx-auto">
				Our streamlined process gets you from discovery to watching in just three simple steps
			</p>
		</div>

		<!-- Steps -->
		<div class="relative">
			<!-- Connection Line -->
			<div class="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-blue-500 to-red-500 transform -translate-y-1/2 opacity-30"></div>
			
			<div class="grid lg:grid-cols-3 gap-8 lg:gap-12">
				{#each HOW_IT_WORKS_STEPS as step, index}
					<div class="transition-all duration-600 ease-out" 
						 class:opacity-0={!isVisible} 
						 class:opacity-100={isVisible}
						 class:translate-y-8={!isVisible}
						 class:translate-y-0={isVisible}
						 style="transition-delay: {200 + (index * 200)}ms;">
						<Card variant="step" class="p-8 text-center relative group">
							<!-- Step Number -->
							<div class="absolute -top-6 left-1/2 transform -translate-x-1/2">
								<div class="w-12 h-12 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
									{step.step}
								</div>
							</div>

							<!-- Step Animation -->
							<div class="mt-8 mb-6 flex justify-center">
								{#if step.animation === 'swipe-gesture'}
									<!-- Swipe Animation -->
									<div class="relative w-20 h-32 bg-gray-800 rounded-2xl border-4 border-gray-700 overflow-hidden group-hover:scale-105 transition-transform duration-300">
										<div class="absolute inset-2 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl">
											<div class="swipe-card absolute inset-2 bg-gradient-to-br from-red-900/30 to-blue-900/30 rounded-lg flex items-center justify-center">
												<div class="w-8 h-8 bg-white/20 rounded-full"></div>
											</div>
										</div>
										<!-- Swipe indicator -->
										<div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
											<div class="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
											<div class="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style="animation-delay: 0.5s;"></div>
										</div>
									</div>
								{:else if step.animation === 'platform-match'}
									<!-- Platform Matching Animation -->
									<div class="relative">
										<div class="grid grid-cols-2 gap-2">
											{#each ['N', 'D', 'H', 'P'] as platform, i}
												<div class="w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-white text-xs font-bold platform-icon" style="animation-delay: {i * 0.2}s;">
													{platform}
												</div>
											{/each}
										</div>
										<div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
									</div>
								{:else if step.animation === 'instant-watch'}
									<!-- Instant Watch Animation -->
									<div class="relative">
										<div class="w-16 h-16 bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
											<svg class="w-8 h-8 text-white play-icon" fill="currentColor" viewBox="0 0 24 24">
												<path d="M8 5v14l11-7z"/>
											</svg>
										</div>
										<div class="absolute inset-0 border-2 border-blue-400 rounded-full animate-pulse"></div>
									</div>
								{/if}
							</div>

							<!-- Step Content -->
							<h3 class="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-blue-500 group-hover:bg-clip-text transition-all duration-300">
								{step.title}
							</h3>
							<p class="text-gray-300 leading-relaxed">
								{step.description}
							</p>

							<!-- Step Indicator -->
							<div class="mt-6 flex items-center justify-center">
								<div class="flex space-x-2">
									{#each Array(3) as _, i}
										<div class="w-2 h-2 rounded-full {i === index ? 'bg-blue-500' : 'bg-gray-600'}"></div>
									{/each}
								</div>
							</div>
						</Card>
					</div>
				{/each}
			</div>
		</div>

		<!-- Bottom CTA -->
		<div class="mt-16 text-center transition-all duration-600 ease-out" 
			 class:opacity-0={!isVisible} 
			 class:opacity-100={isVisible}
			 class:translate-y-8={!isVisible}
			 class:translate-y-0={isVisible}
			 style="transition-delay: 800ms;">
			<div class="inline-flex items-center space-x-4 bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-700/50 rounded-2xl px-8 py-6 backdrop-blur-sm">
				<div class="flex items-center space-x-2">
					<div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
					<span class="text-white font-semibold">Average time:</span>
				</div>
				<div class="text-3xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
					{'< 30 seconds'}
				</div>
				<div class="text-gray-400">
					from swipe to stream
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.swipe-card {
		animation: swipe-demo 3s ease-in-out infinite;
	}

	.platform-icon {
		animation: platform-pulse 2s ease-in-out infinite;
	}

	.play-icon {
		animation: play-pulse 2s ease-in-out infinite;
	}

	@keyframes swipe-demo {
		0%, 100% { transform: translateX(0) rotate(0deg); }
		25% { transform: translateX(4px) rotate(2deg); }
		75% { transform: translateX(-4px) rotate(-2deg); }
	}

	@keyframes platform-pulse {
		0%, 100% { transform: scale(1); opacity: 0.7; }
		50% { transform: scale(1.1); opacity: 1; }
	}

	@keyframes play-pulse {
		0%, 100% { transform: scale(1); }
		50% { transform: scale(1.1); }
	}
</style>