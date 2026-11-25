/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Core palette
        bg: {
          base:    '#06100a',
          surface: '#0c1912',
          raised:  '#111f17',
          overlay: '#162a1e',
        },
        border: {
          subtle: 'rgba(0, 230, 115, 0.08)',
          dim:    'rgba(0, 230, 115, 0.14)',
          base:   'rgba(0, 230, 115, 0.22)',
          strong: 'rgba(0, 230, 115, 0.40)',
        },
        txt: {
          primary:   '#e4f0e8',
          secondary: '#7fa990',
          muted:     '#496654',
          inverse:   '#06100a',
        },
        accent: {
          DEFAULT: '#00e673',
          bright:  '#00ff88',
          dim:     'rgba(0, 230, 115, 0.15)',
          glow:    'rgba(0, 230, 115, 0.30)',
        },
        // Semantic
        red:    '#ff3d55',
        orange: '#ff9544',
        yellow: '#ffc533',
        purple: '#b05af2',
        cyan:   '#00d4ff',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
        xs:    ['0.75rem', { lineHeight: '1.125rem' }],
        sm:    ['0.875rem', { lineHeight: '1.375rem' }],
        base:  ['1rem', { lineHeight: '1.75rem' }],
        lg:    ['1.125rem', { lineHeight: '1.875rem' }],
        xl:    ['1.25rem', { lineHeight: '1.875rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.375rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.75rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.05' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      maxWidth: {
        prose: '72ch',
        article: '760px',
        wide: '1100px',
        layout: '1280px',
      },
      boxShadow: {
        'card':      '0 1px 3px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,230,115,0.08)',
        'card-hover':'0 4px 20px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,230,115,0.22)',
        'glow-sm':   '0 0 12px rgba(0,230,115,0.20)',
        'glow':      '0 0 24px rgba(0,230,115,0.25)',
        'inner-sm':  'inset 0 1px 0 rgba(255,255,255,0.04)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'blink': {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0' },
        },
        'progress': {
          '0%':   { width: '0%' },
          '100%': { width: '100%' },
        },
        'pulse-border': {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(0,230,115,0.3)' },
          '50%':     { boxShadow: '0 0 0 4px rgba(0,230,115,0)' },
        },
      },
      animation: {
        'fade-up':      'fade-up 0.5s ease-out forwards',
        'blink':        'blink 1s step-end infinite',
        'pulse-border': 'pulse-border 2s ease-in-out infinite',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body':         '#e4f0e8',
            '--tw-prose-headings':     '#ffffff',
            '--tw-prose-lead':         '#7fa990',
            '--tw-prose-links':        '#00e673',
            '--tw-prose-bold':         '#e4f0e8',
            '--tw-prose-counters':     '#496654',
            '--tw-prose-bullets':      '#00e673',
            '--tw-prose-hr':           'rgba(0,230,115,0.12)',
            '--tw-prose-quotes':       '#7fa990',
            '--tw-prose-quote-borders':'rgba(0,230,115,0.30)',
            '--tw-prose-captions':     '#496654',
            '--tw-prose-code':         '#00ff88',
            '--tw-prose-pre-code':     '#e4f0e8',
            '--tw-prose-pre-bg':       '#0c1912',
            '--tw-prose-th-borders':   'rgba(0,230,115,0.20)',
            '--tw-prose-td-borders':   'rgba(0,230,115,0.10)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
