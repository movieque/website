# 🎬 MovieQue Landing Page

**Domain**: movieque.com  
**Tagline**: "Stop Endless Scrolling, Start Discovering"

A modern landing page for MovieQue - the TikTok-style movie discovery app that solves streaming fatigue through swipeable movie clips and instant streaming access.

## 🎯 Project Overview

MovieQue revolutionizes movie discovery by letting users swipe through curated movie clips and trailers like TikTok. When you find something you love, we instantly connect you to the right streaming platform or enable VPN access when needed.

**Target Audience**: Movie enthusiasts and streaming subscribers (18-35) frustrated with endless scrolling and discovery fatigue.

## 🚀 Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) - Full-stack web framework
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- **Testing**: [Vitest](https://vitest.dev/) - Fast unit testing framework
- **Package Manager**: [Bun](https://bun.sh/) - Fast JavaScript runtime and package manager
- **Linting**: ESLint with Prettier for code formatting

## 🎨 Design System

### Brand Colors
- **Primary Red**: `#FF0040` - Bright, energetic red for primary actions
- **Primary Blue**: `#0080FF` - Vibrant blue for secondary elements
- **Dark Background**: `#0A0A0A` - Deep black for modern dark theme
- **Dark Surface**: `#1A1A1A` - Card and component backgrounds
- **Text Colors**: White (`#FFFFFF`) primary, gray (`#A0A0A0`) secondary

### Design Theme
- **Dark layout** with modern, engaging animations
- **Gradient accents** combining red and blue brand colors
- **TikTok-inspired** swipe interactions and mobile-first design
- **Smooth animations** and micro-interactions throughout

## 📦 Installation

Make sure you have [Bun](https://bun.sh/) installed on your system.

```bash
# Clone the repository
git clone <repository-url>
cd movieque-website

# Install dependencies
bun install
```

## 🛠️ Development

Start the development server:

```bash
bun run dev

# or start the server and open the app in a new browser tab
bun run dev --open
```

The development server will be available at `http://localhost:5173`

## 🏗️ Building

Create a production build:

```bash
bun run build
```

Preview the production build:

```bash
bun run preview
```

## 🧪 Testing

Run the test suite:

```bash
# Run tests once
bun run test

# Run tests in watch mode
bun run test:unit
```

## 📝 Code Quality

Format code with Prettier:

```bash
bun run format
```

Lint code with ESLint:

```bash
bun run lint
```

Type check with TypeScript:

```bash
bun run check

# or in watch mode
bun run check:watch
```

## 📁 Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button.svelte
│   │   │   ├── Card.svelte
│   │   │   └── Input.svelte
│   │   ├── sections/        # Landing page sections
│   │   │   ├── HeroSection.svelte
│   │   │   ├── FeaturesSection.svelte
│   │   │   ├── HowItWorksSection.svelte
│   │   │   └── CTASection.svelte
│   │   └── animations/      # Animation components
│   │       └── PhoneMockup.svelte
│   ├── types/              # TypeScript type definitions
│   │   └── movie.ts
│   └── utils/              # Utility functions
│       ├── animations.ts
│       └── constants.ts
├── routes/
│   ├── +layout.svelte      # Global layout
│   ├── +layout.ts          # Layout data
│   └── +page.svelte        # Main landing page
├── app.html               # HTML template
├── app.css                # Global styles and Tailwind imports
└── app.d.ts               # TypeScript declarations
```

## 🎬 Landing Page Features

### Hero Section
- **Animated Phone Mockup** showing TikTok-style movie discovery interface
- **Primary CTA**: "Join the Beta" with gradient red button
- **Secondary CTA**: "Watch Demo" with blue outline button
- **Swipe animations** demonstrating the core user experience

### Features Section - "Three Problems, One Solution"
1. **Discovery Fatigue**: "No More 10-Minute Netflix Scrolls"
2. **Unknown Movies**: "Found It on TikTok? We'll Name It"  
3. **Streaming Access**: "Watch Anywhere, Anytime"

### How It Works Section
- **Step 1**: Swipe & Discover through movie clips
- **Step 2**: Get matched with streaming availability
- **Step 3**: Watch instantly on your preferred platform

### CTA Section
- **Beta signup form** with email capture
- **Social proof**: "Join 1,000+ movie lovers in early access"
- **Gradient CTA button**: "Get Early Access"

## 🎭 Key Animations & Interactions

- **Scroll-triggered animations** using Intersection Observer
- **Phone mockup animations** showing swipe gestures and movie clips
- **Gradient hover effects** on buttons and interactive elements
- **Smooth transitions** between sections (0.3s ease-in-out)
- **Micro-interactions** on form elements and buttons
- **TikTok-style swipe animations** in the hero mockup

## 📱 Responsive Design

- **Mobile First**: 320px - 767px (optimized for touch interactions)
- **Tablet**: 768px - 1023px (balanced layouts)
- **Desktop**: 1024px - 1439px (full feature showcase)
- **Large Desktop**: 1440px+ (enhanced visuals with max-width container)

## 🚀 Performance Features

- **Static site generation** using `@sveltejs/adapter-static`
- **Lazy loading** for images and animations
- **Optimized SVG icons** for fast loading
- **Critical CSS inlining** for above-the-fold content
- **Minimal JavaScript** leveraging Svelte's efficiency

## 🎯 Success Metrics

- **Primary**: Beta signup conversion rate
- **Secondary**: Time on page, scroll depth engagement
- **Interaction**: Demo video play rate, feature section engagement
- **Technical**: Page load speed, mobile performance scores

## 🚀 Deployment

This project is configured for static site generation. Deploy to any static hosting service:

- **Vercel**: Connect repository for automatic deployments
- **Netlify**: Deploy via Git or drag-and-drop build folder
- **GitHub Pages**: Use built files from the `build` directory

## 📄 License

This project is private and proprietary to MovieQue.

## 🤝 Contributing

This is a private project for the MovieQue team. Please follow established development workflows and coding standards when contributing.

---

**Built with ❤️ for movie lovers everywhere**  
*Transforming movie discovery, one swipe at a time*
