<script lang="ts">
	interface Props {
		type?: 'text' | 'email' | 'password' | 'number';
		placeholder?: string;
		value?: string;
		disabled?: boolean;
		required?: boolean;
		class?: string;
		id?: string;
		name?: string;
		oninput?: (event: Event) => void;
		onkeypress?: (event: KeyboardEvent) => void;
	}

	let {
		type = 'text',
		placeholder = '',
		value = $bindable(''),
		disabled = false,
		required = false,
		class: className = '',
		id,
		name,
		oninput,
		onkeypress
	}: Props = $props();

	const baseClasses = 'w-full px-4 py-3 rounded-lg border bg-gray-900/50 text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 backdrop-blur-sm';
	const normalClasses = 'border-gray-700 focus:border-blue-500 focus:ring-blue-500';
	const disabledClasses = 'opacity-50 cursor-not-allowed';

	const classes = $derived([
		baseClasses,
		normalClasses,
		disabled && disabledClasses,
		className
	].filter(Boolean).join(' '));

	function handleInput(event: Event) {
		if (oninput) {
			oninput(event);
		}
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (onkeypress) {
			onkeypress(event);
		}
	}
</script>

<input
	{type}
	{placeholder}
	bind:value
	{disabled}
	{required}
	{id}
	{name}
	class={classes}
	oninput={handleInput}
	onkeypress={handleKeyPress}
/>