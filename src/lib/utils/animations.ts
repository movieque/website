import { ANIMATION_DURATIONS } from './constants.js';

export interface AnimationOptions {
	duration?: number;
	delay?: number;
	easing?: string;
}

export const EASING_FUNCTIONS = {
	easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
	easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
	easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
	bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
} as const;

export function createFadeInUp(options: AnimationOptions = {}) {
	const { duration = ANIMATION_DURATIONS.normal, delay = 0, easing = EASING_FUNCTIONS.easeOut } = options;
	
	return {
		duration,
		delay,
		css: (t: number) => `
			transform: translateY(${(1 - t) * 20}px);
			opacity: ${t};
			transition-timing-function: ${easing};
		`
	};
}

export function createSlideInLeft(options: AnimationOptions = {}) {
	const { duration = ANIMATION_DURATIONS.normal, delay = 0, easing = EASING_FUNCTIONS.easeOut } = options;
	
	return {
		duration,
		delay,
		css: (t: number) => `
			transform: translateX(${(1 - t) * -30}px);
			opacity: ${t};
			transition-timing-function: ${easing};
		`
	};
}

export function createSlideInRight(options: AnimationOptions = {}) {
	const { duration = ANIMATION_DURATIONS.normal, delay = 0, easing = EASING_FUNCTIONS.easeOut } = options;
	
	return {
		duration,
		delay,
		css: (t: number) => `
			transform: translateX(${(1 - t) * 30}px);
			opacity: ${t};
			transition-timing-function: ${easing};
		`
	};
}

export function createScaleIn(options: AnimationOptions = {}) {
	const { duration = ANIMATION_DURATIONS.normal, delay = 0, easing = EASING_FUNCTIONS.bounce } = options;
	
	return {
		duration,
		delay,
		css: (t: number) => `
			transform: scale(${0.8 + (t * 0.2)});
			opacity: ${t};
			transition-timing-function: ${easing};
		`
	};
}

export function observeIntersection(
	element: Element,
	callback: (isIntersecting: boolean) => void,
	options: IntersectionObserverInit = {}
): IntersectionObserver {
	const defaultOptions: IntersectionObserverInit = {
		threshold: 0.2,
		rootMargin: '0px 0px -100px 0px',
		...options
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			callback(entry.isIntersecting);
		});
	}, defaultOptions);

	observer.observe(element);
	return observer;
}

export function createStaggeredAnimation(
	elements: NodeListOf<Element> | Element[],
	animationClass: string,
	staggerDelay: number = 100
): void {
	elements.forEach((element, index) => {
		setTimeout(() => {
			element.classList.add(animationClass);
		}, index * staggerDelay);
	});
}

export function createSwipeAnimation() {
	return {
		duration: ANIMATION_DURATIONS.fast,
		css: (t: number, u: number) => `
			transform: translateX(${u * 100}px) rotate(${u * 10}deg);
			opacity: ${t};
		`
	};
}

export function createPulseAnimation(color: string = '#FF0040') {
	return `
		@keyframes pulse {
			0%, 100% { 
				box-shadow: 0 0 0 0 ${color}40;
			}
			50% { 
				box-shadow: 0 0 0 10px ${color}00;
			}
		}
		animation: pulse 2s infinite;
	`;
}

export function createGradientShift() {
	return `
		@keyframes gradient-shift {
			0% { background-position: 0% 50%; }
			50% { background-position: 100% 50%; }
			100% { background-position: 0% 50%; }
		}
		background-size: 200% 200%;
		animation: gradient-shift 3s ease infinite;
	`;
}