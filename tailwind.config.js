/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	  darkMode: ["class"],
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		  fontSize: {
			'xs': '0.21rem',     // 0.75rem * 0.84 / 3
			'sm': '0.245rem',    // 0.875rem * 0.84 / 3
			'base': '0.28rem',   // 1rem * 0.84 / 3
			'lg': '0.315rem',    // 1.125rem * 0.84 / 3
			'xl': '0.35rem',     // 1.25rem * 0.84 / 3
			'2xl': '0.42rem',    // 1.5rem * 0.84 / 3
			'3xl': '0.525rem',   // 1.875rem * 0.84 / 3
			'4xl': '0.63rem',    // 2.25rem * 0.84 / 3
			'5xl': '0.84rem',    // 3rem * 0.84 / 3
			'6xl': '1.05rem',    // 3.75rem * 0.84 / 3
			'7xl': '1.26rem',    // 4.5rem * 0.84 / 3
			'8xl': '1.68rem',    // 6rem * 0.84 / 3
			'9xl': '2.24rem',    // 8rem * 0.84 / 3
		  }
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
