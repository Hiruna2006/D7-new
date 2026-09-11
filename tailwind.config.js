/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // All brand colours resolve through CSS design tokens in app/globals.css.
        // Keeping the legacy utility names preserves the current visual design.
        petal: 'rgb(var(--brand-petal) / <alpha-value>)',
        rose: 'rgb(var(--brand-rose) / <alpha-value>)',
        fuchsia: 'rgb(var(--brand-fuchsia) / <alpha-value>)',
        crimson: 'rgb(var(--brand-crimson) / <alpha-value>)',
        burgundy: 'rgb(var(--brand-burgundy) / <alpha-value>)',
        maroon: {
          DEFAULT: 'rgb(var(--brand-burgundy) / <alpha-value>)',
          700: 'rgb(var(--brand-burgundy-dark) / <alpha-value>)',
        },
        sand: 'rgb(var(--brand-sand) / <alpha-value>)',
        gold: 'rgb(var(--brand-gold) / <alpha-value>)',
        amberD7: 'rgb(var(--brand-gold) / <alpha-value>)',
        bronze: 'rgb(var(--brand-bronze) / <alpha-value>)',
        deepRed: 'rgb(var(--brand-deep-red) / <alpha-value>)',
        deepCrimson: 'rgb(var(--brand-deep-crimson) / <alpha-value>)',
        campaign: {
          DEFAULT: 'rgb(var(--campaign-bg) / <alpha-value>)',
          surface: 'rgb(var(--campaign-surface) / <alpha-value>)',
        },
        background: 'rgb(var(--bg) / <alpha-value>)',
        foreground: 'rgb(var(--fg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        fuchsiaGlow: '0 0 40px rgb(var(--brand-fuchsia) / 0.2)',
        adminGold: '0 25px 55px -35px rgb(var(--brand-gold) / 0.4)',
        adminBurgundy: '0 18px 35px -28px rgb(var(--brand-burgundy) / 0.7)',
        adminBurgundySoft: '0 25px 55px -35px rgb(var(--brand-burgundy) / 0.4)',
      },
      backgroundImage: {
        brandDeepRadial: 'radial-gradient(circle at center, rgb(var(--brand-deep-red) / 0.3), transparent 70%)',
        brandFuchsiaRadial: 'radial-gradient(600px at 50% 50%, rgb(var(--brand-fuchsia) / 0.05), transparent)',
      },
      dropShadow: { fuchsiaGlow: '0 0 25px rgb(var(--brand-fuchsia) / 0.2)' },
    },
  },
  plugins: [],
};
