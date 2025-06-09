<script lang="ts">
	interface Props {
		variant?: 'default' | 'feature' | 'step';
		hover?: boolean;
		class?: string;
		children: import('svelte').Snippet;
	}

	let {
		variant = 'default',
		hover = true,
		class: className = '',
		children
	}: Props = $props();

	const baseClasses = 'rounded-xl border transition-all duration-300';
	
	const variantClasses = {
		default: 'bg-gray-900/50 border-gray-800 backdrop-blur-sm',
		feature: 'bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-gray-700/50 backdrop-blur-sm',
		step: 'bg-gray-900/60 border-gray-700/30 backdrop-blur-sm'
	};

	const hoverClasses = hover ? 'hover:border-gray-600 hover:shadow-lg hover:shadow-red-500/10 hover:-translate-y-1' : '';

	const classes = $derived([
		baseClasses,
		variantClasses[variant],
		hoverClasses,
		className
	].filter(Boolean).join(' '));
</script>

<div class={classes}>
	{@render children()}
</div>