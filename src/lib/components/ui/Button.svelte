<script lang="ts">
	import { COLORS } from '../../utils/constants.js';

	interface Props {
		variant?: 'primary' | 'secondary' | 'outline';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		loading?: boolean;
		href?: string;
		onclick?: () => void;
		class?: string;
		children: import('svelte').Snippet;
	}

	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		loading = false,
		href,
		onclick,
		class: className = '',
		children
	}: Props = $props();

	const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900';
	
	const variantClasses = {
		primary: `bg-gradient-to-r from-red-500 to-blue-500 text-white hover:from-red-600 hover:to-blue-600 focus:ring-red-500 shadow-lg hover:shadow-xl transform hover:scale-105`,
		secondary: `bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 focus:ring-gray-600`,
		outline: `border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:ring-blue-500`
	};

	const sizeClasses = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-6 py-3 text-base',
		lg: 'px-8 py-4 text-lg'
	};

	const disabledClasses = 'opacity-50 cursor-not-allowed transform-none hover:scale-100';
	const loadingClasses = 'cursor-wait';

	const classes = $derived([
		baseClasses,
		variantClasses[variant],
		sizeClasses[size],
		disabled && disabledClasses,
		loading && loadingClasses,
		className
	].filter(Boolean).join(' '));

	function handleClick() {
		if (!disabled && !loading && onclick) {
			onclick();
		}
	}
</script>

{#if href}
	<a {href} class={classes} role="button" tabindex={disabled ? -1 : 0}>
		{#if loading}
			<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
		{/if}
		{@render children()}
	</a>
{:else}
	<button 
		class={classes} 
		{disabled}
		onclick={handleClick}
		type="button"
	>
		{#if loading}
			<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
		{/if}
		{@render children()}
	</button>
{/if}

<style>
	:global(.gradient-animation) {
		background-size: 200% 200%;
		animation: gradient-shift 3s ease infinite;
	}

	@keyframes gradient-shift {
		0% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
		100% { background-position: 0% 50%; }
	}
</style>