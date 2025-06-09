<script lang="ts">
	import { onMount } from 'svelte';
	import { MOCK_MOVIE_CLIPS, STREAMING_PLATFORMS } from '../../utils/constants.js';
	import type { MovieClip } from '../../types/movie.js';

	interface Props {
		autoplay?: boolean;
		class?: string;
	}

	let {
		autoplay = true,
		class: className = ''
	}: Props = $props();

	let currentClipIndex = $state(0);
	let isAnimating = $state(false);
	let swipeDirection = $state<'left' | 'right' | null>(null);
	let intervalId: number | null = null;

	const currentClip = $derived(MOCK_MOVIE_CLIPS[currentClipIndex]);

	function nextClip() {
		if (isAnimating) return;
		
		isAnimating = true;
		swipeDirection = 'right';
		
		setTimeout(() => {
			currentClipIndex = (currentClipIndex + 1) % MOCK_MOVIE_CLIPS.length;
			swipeDirection = null;
			isAnimating = false;
		}, 300);
	}

	function previousClip() {
		if (isAnimating) return;
		
		isAnimating = true;
		swipeDirection = 'left';
		
		setTimeout(() => {
			currentClipIndex = currentClipIndex === 0 ? MOCK_MOVIE_CLIPS.length - 1 : currentClipIndex - 1;
			swipeDirection = null;
			isAnimating = false;
		}, 300);
	}

	function startAutoplay() {
		if (intervalId) clearInterval(intervalId);
		intervalId = setInterval(nextClip, 3000);
	}

	function stopAutoplay() {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
	}

	onMount(() => {
		if (autoplay) {
			startAutoplay();
		}

		return () => {
			stopAutoplay();
		};
	});
</script>

<div class="phone-mockup {className}" role="img" aria-label="MovieQue app mockup">
	<!-- Phone Frame -->
	<div class="relative w-72 h-[600px] bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden">
		<!-- Screen -->
		<div class="relative w-full h-full bg-black rounded-[2rem] overflow-hidden">
			<!-- Status Bar -->
			<div class="flex justify-between items-center px-6 py-3 text-white text-sm">
				<span class="font-semibold">9:41</span>
				<div class="flex items-center space-x-1">
					<div class="w-4 h-2 bg-white rounded-sm"></div>
					<div class="w-6 h-3 border border-white rounded-sm">
						<div class="w-4 h-full bg-white rounded-sm"></div>
					</div>
				</div>
			</div>

			<!-- App Header -->
			<div class="px-6 py-4 border-b border-gray-800">
				<h1 class="text-2xl font-bold text-white">
					<span class="text-red-500">Movie</span><span class="text-blue-500">Que</span>
				</h1>
			</div>

			<!-- Movie Card Stack -->
			<div class="relative flex-1 p-4">
				{#each MOCK_MOVIE_CLIPS as clip, index}
					{@const isActive = index === currentClipIndex}
					{@const isNext = index === (currentClipIndex + 1) % MOCK_MOVIE_CLIPS.length}
					{@const isPrev = index === (currentClipIndex - 1 + MOCK_MOVIE_CLIPS.length) % MOCK_MOVIE_CLIPS.length}
					
					<div 
						class="absolute inset-4 rounded-2xl overflow-hidden transition-all duration-300 ease-out"
						class:active={isActive}
						class:next={isNext}
						class:prev={isPrev}
						class:swipe-right={isActive && swipeDirection === 'right'}
						class:swipe-left={isActive && swipeDirection === 'left'}
						style="z-index: {isActive ? 10 : isNext || isPrev ? 5 : 1}"
					>
						<!-- Movie Poster Background -->
						<div class="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900">
							<!-- Placeholder for movie thumbnail -->
							<div class="absolute inset-0 bg-gradient-to-br from-red-900/20 to-blue-900/20"></div>
							
							<!-- Movie Info Overlay -->
							<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
								<h3 class="text-xl font-bold text-white mb-2">{clip.title}</h3>
								<p class="text-gray-300 text-sm mb-3">{clip.description}</p>
								<div class="flex items-center justify-between">
									<div class="flex items-center space-x-2">
										<span class="text-yellow-400 text-sm">★ {clip.rating}</span>
										<span class="text-gray-400 text-sm">{clip.year}</span>
									</div>
									<div class="flex space-x-1">
										{#each clip.genre.slice(0, 2) as genre}
											<span class="px-2 py-1 bg-gray-700 text-xs text-gray-300 rounded">{genre}</span>
										{/each}
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Action Buttons -->
			<div class="flex justify-center items-center space-x-8 pb-8">
				<button 
					class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-2xl hover:bg-gray-700 transition-colors"
					onclick={previousClip}
					aria-label="Skip movie"
				>
					<span class="text-gray-400">✕</span>
				</button>
				<button 
					class="w-16 h-16 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center text-2xl hover:from-red-600 hover:to-blue-600 transition-all transform hover:scale-110"
					onclick={nextClip}
					aria-label="Like movie"
				>
					<span class="text-white">♥</span>
				</button>
			</div>

			<!-- Streaming Platforms Preview -->
			<div class="px-6 pb-4">
				<div class="flex items-center justify-center space-x-3">
					<span class="text-gray-400 text-xs">Available on:</span>
					{#each STREAMING_PLATFORMS.slice(0, 3) as platform}
						<div class="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
							<span class="text-xs text-white">{platform.name[0]}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Home Indicator -->
		<div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full opacity-60"></div>
	</div>
</div>

<style>
	.phone-mockup {
		filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5));
	}

	.active {
		transform: scale(1) rotate(0deg);
		opacity: 1;
	}

	.next {
		transform: scale(0.95) rotate(-2deg);
		opacity: 0.8;
	}

	.prev {
		transform: scale(0.9) rotate(2deg);
		opacity: 0.6;
	}

	.swipe-right {
		transform: translateX(100%) rotate(15deg);
		opacity: 0;
	}

	.swipe-left {
		transform: translateX(-100%) rotate(-15deg);
		opacity: 0;
	}
</style>