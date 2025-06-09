<script lang="ts">
	import { onMount } from 'svelte';
	import HeroSection from '../lib/components/sections/HeroSection.svelte';
	import FeaturesSection from '../lib/components/sections/FeaturesSection.svelte';
	import HowItWorksSection from '../lib/components/sections/HowItWorksSection.svelte';
	import CTASection from '../lib/components/sections/CTASection.svelte';

	onMount(() => {
		// Set page title and meta description
		document.title = 'MovieQue - Stop Endless Scrolling, Start Discovering';
		
		// Add meta description
		const metaDescription = document.querySelector('meta[name="description"]');
		if (metaDescription) {
			metaDescription.setAttribute('content', 'Swipe through movie clips like TikTok, get instant access to watch on your favorite streaming platform. Join 1000+ movie lovers discovering films in seconds, not minutes.');
		} else {
			const meta = document.createElement('meta');
			meta.name = 'description';
			meta.content = 'Swipe through movie clips like TikTok, get instant access to watch on your favorite streaming platform. Join 1000+ movie lovers discovering films in seconds, not minutes.';
			document.head.appendChild(meta);
		}

		// Add Open Graph meta tags
		const ogTags = [
			{ property: 'og:title', content: 'MovieQue - Stop Endless Scrolling, Start Discovering' },
			{ property: 'og:description', content: 'Swipe through movie clips like TikTok, get instant access to watch on your favorite streaming platform.' },
			{ property: 'og:type', content: 'website' },
			{ property: 'og:url', content: 'https://movieque.com' },
			{ property: 'og:site_name', content: 'MovieQue' }
		];

		ogTags.forEach(tag => {
			const existing = document.querySelector(`meta[property="${tag.property}"]`);
			if (existing) {
				existing.setAttribute('content', tag.content);
			} else {
				const meta = document.createElement('meta');
				meta.setAttribute('property', tag.property);
				meta.setAttribute('content', tag.content);
				document.head.appendChild(meta);
			}
		});

		// Add Twitter Card meta tags
		const twitterTags = [
			{ name: 'twitter:card', content: 'summary_large_image' },
			{ name: 'twitter:title', content: 'MovieQue - Stop Endless Scrolling, Start Discovering' },
			{ name: 'twitter:description', content: 'Swipe through movie clips like TikTok, get instant access to watch on your favorite streaming platform.' }
		];

		twitterTags.forEach(tag => {
			const existing = document.querySelector(`meta[name="${tag.name}"]`);
			if (existing) {
				existing.setAttribute('content', tag.content);
			} else {
				const meta = document.createElement('meta');
				meta.setAttribute('name', tag.name);
				meta.setAttribute('content', tag.content);
				document.head.appendChild(meta);
			}
		});
	});
</script>

<svelte:head>
	<title>MovieQue - Stop Endless Scrolling, Start Discovering</title>
	<meta name="description" content="Swipe through movie clips like TikTok, get instant access to watch on your favorite streaming platform. Join 1000+ movie lovers discovering films in seconds, not minutes." />
	<meta name="keywords" content="movie discovery, streaming, TikTok movies, film recommendation, Netflix alternative, movie app, VPN streaming" />
	<meta name="author" content="MovieQue" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	
	<!-- Preconnect to external domains for performance -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	
	<!-- Favicon -->
	<link rel="icon" type="image/png" href="/favicon.png" />
	
	<!-- Theme color for mobile browsers -->
	<meta name="theme-color" content="#0A0A0A" />
	
	<!-- Prevent zoom on mobile -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
</svelte:head>

<!-- Main Landing Page -->
<main class="min-h-screen bg-black text-white overflow-x-hidden">
	<!-- Hero Section -->
	<HeroSection />
	
	<!-- Features Section -->
	<FeaturesSection />
	
	<!-- How It Works Section -->
	<HowItWorksSection />
	
	<!-- CTA Section -->
	<CTASection />
	
	<!-- Footer -->
	<footer class="bg-gray-900 border-t border-gray-800 py-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid md:grid-cols-4 gap-8">
				<!-- Brand -->
				<div class="md:col-span-2">
					<h3 class="text-2xl font-bold mb-4">
						<span class="text-red-500">Movie</span><span class="text-blue-500">Que</span>
					</h3>
					<p class="text-gray-400 mb-6 max-w-md">
						Transforming movie discovery with TikTok-style browsing and instant streaming access. 
						No more endless scrolling, just perfect movie matches.
					</p>
					<div class="flex space-x-4">
						<!-- Social Media Links (placeholder) -->
						<a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors" aria-label="Twitter">
							<svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
								<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
							</svg>
						</a>
						<a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors" aria-label="Instagram">
							<svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297z"/>
							</svg>
						</a>
					</div>
				</div>
				
				<!-- Quick Links -->
				<div>
					<h4 class="text-white font-semibold mb-4">Product</h4>
					<ul class="space-y-2 text-gray-400">
						<li><a href="#features-section" class="hover:text-white transition-colors">Features</a></li>
						<li><a href="#how-it-works-section" class="hover:text-white transition-colors">How It Works</a></li>
						<li><a href="#cta-section" class="hover:text-white transition-colors">Beta Access</a></li>
					</ul>
				</div>
				
				<!-- Support -->
				<div>
					<h4 class="text-white font-semibold mb-4">Support</h4>
					<ul class="space-y-2 text-gray-400">
						<li><a href="mailto:hello@movieque.com" class="hover:text-white transition-colors">Contact</a></li>
						<li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
						<li><a href="#" class="hover:text-white transition-colors">Terms of Service</a></li>
					</ul>
				</div>
			</div>
			
			<!-- Bottom Bar -->
			<div class="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
				<p class="text-gray-400 text-sm">
					© 2025 MovieQue. All rights reserved.
				</p>
				<p class="text-gray-400 text-sm mt-2 sm:mt-0">
					Made with ❤️ for movie lovers everywhere
				</p>
			</div>
		</div>
	</footer>
</main>

<!-- Global Styles -->
<style>
	:global(html) {
		scroll-behavior: smooth;
	}
	
	:global(body) {
		background-color: #0A0A0A;
		overflow-x: hidden;
	}
	
	:global(*) {
		box-sizing: border-box;
	}
	
	/* Custom scrollbar */
	:global(::-webkit-scrollbar) {
		width: 8px;
	}
	
	:global(::-webkit-scrollbar-track) {
		background: #1A1A1A;
	}
	
	:global(::-webkit-scrollbar-thumb) {
		background: linear-gradient(135deg, #FF0040 0%, #0080FF 100%);
		border-radius: 4px;
	}
	
	:global(::-webkit-scrollbar-thumb:hover) {
		background: linear-gradient(135deg, #FF0040 0%, #0080FF 100%);
		opacity: 0.8;
	}
	
	/* Selection color */
	:global(::selection) {
		background: rgba(255, 0, 64, 0.3);
		color: white;
	}
	
	:global(::-moz-selection) {
		background: rgba(255, 0, 64, 0.3);
		color: white;
	}
</style>