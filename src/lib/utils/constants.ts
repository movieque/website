import type { FeatureItem, HowItWorksStep, MovieClip, StreamingPlatform } from '../types/movie.js';

export const COLORS = {
	primary: {
		red: '#FF0040',
		blue: '#0080FF'
	},
	dark: {
		bg: '#0A0A0A',
		surface: '#1A1A1A',
		border: '#2A2A2A'
	},
	text: {
		primary: '#FFFFFF',
		secondary: '#A0A0A0',
		accent: '#E0E0E0'
	},
	gradients: {
		primary: 'linear-gradient(135deg, #FF0040 0%, #0080FF 100%)',
		accent: 'linear-gradient(135deg, #FF0040 0%, #FF4080 100%)'
	}
} as const;

export const FEATURES: FeatureItem[] = [
	{
		icon: 'scroll',
		title: 'No More 10-Minute Netflix Scrolls',
		description: 'Swipe through curated movie clips and trailers. Like what you see? Skip what you don\'t. It\'s that simple.',
		animation: 'endless-scroll'
	},
	{
		icon: 'search',
		title: 'Found It on TikTok? We\'ll Name It',
		description: 'See a movie clip you love but don\'t know the title? Our AI identifies it instantly from any clip or trailer.',
		animation: 'ai-search'
	},
	{
		icon: 'globe',
		title: 'Watch Anywhere, Anytime',
		description: 'Automatically connects you to the right streaming platform in your region, or seamlessly enables VPN access when needed.',
		animation: 'vpn-globe'
	}
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
	{
		step: 1,
		title: 'Swipe & Discover',
		description: 'Browse movie clips with simple swipe gestures',
		animation: 'swipe-gesture'
	},
	{
		step: 2,
		title: 'Get Matched',
		description: 'See which streaming platforms have your movie',
		animation: 'platform-match'
	},
	{
		step: 3,
		title: 'Watch Instantly',
		description: 'Seamless transition to your chosen platform',
		animation: 'instant-watch'
	}
];

export const MOCK_MOVIE_CLIPS: MovieClip[] = [
	{
		id: '1',
		title: 'Inception',
		thumbnail: '/assets/mockups/inception-thumb.jpg',
		duration: 148,
		genre: ['Sci-Fi', 'Thriller'],
		year: 2010,
		rating: 8.8,
		description: 'A thief who steals corporate secrets through dream-sharing technology'
	},
	{
		id: '2',
		title: 'The Dark Knight',
		thumbnail: '/assets/mockups/dark-knight-thumb.jpg',
		duration: 152,
		genre: ['Action', 'Crime', 'Drama'],
		year: 2008,
		rating: 9.0,
		description: 'Batman faces the Joker in this epic superhero thriller'
	},
	{
		id: '3',
		title: 'Interstellar',
		thumbnail: '/assets/mockups/interstellar-thumb.jpg',
		duration: 169,
		genre: ['Sci-Fi', 'Drama'],
		year: 2014,
		rating: 8.6,
		description: 'A team of explorers travel through a wormhole in space'
	}
];

export const STREAMING_PLATFORMS: StreamingPlatform[] = [
	{
		name: 'Netflix',
		logo: '/assets/platforms/netflix.svg',
		available: true,
		color: '#E50914'
	},
	{
		name: 'Disney+',
		logo: '/assets/platforms/disney.svg',
		available: true,
		color: '#113CCF'
	},
	{
		name: 'HBO Max',
		logo: '/assets/platforms/hbo.svg',
		available: false,
		region: 'US',
		color: '#8B5CF6'
	},
	{
		name: 'Amazon Prime',
		logo: '/assets/platforms/prime.svg',
		available: true,
		color: '#00A8E1'
	}
];

export const ANIMATION_DURATIONS = {
	fast: 200,
	normal: 300,
	slow: 500,
	extra_slow: 800
} as const;

export const BREAKPOINTS = {
	mobile: 320,
	tablet: 768,
	desktop: 1024,
	large: 1440
} as const;