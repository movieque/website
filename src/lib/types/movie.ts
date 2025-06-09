export interface MovieClip {
	id: string;
	title: string;
	thumbnail: string;
	duration: number;
	genre: string[];
	year: number;
	rating?: number;
	description?: string;
}

export interface StreamingPlatform {
	name: string;
	logo: string;
	available: boolean;
	region?: string;
	url?: string;
	color?: string;
}

export interface FeatureItem {
	icon: string;
	title: string;
	description: string;
	animation?: string;
}

export interface HowItWorksStep {
	step: number;
	title: string;
	description: string;
	animation: string;
}