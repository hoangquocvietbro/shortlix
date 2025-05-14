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
			'xs': '0.2625rem',    // 0.21 * 1.25
			'sm': '0.30625rem',   // 0.245 * 1.25
			'base': '0.35rem',    // 0.28 * 1.25
			'lg': '0.39375rem',   // 0.315 * 1.25
			'xl': '0.4375rem',    // 0.35 * 1.25
			'2xl': '0.525rem',    // 0.42 * 1.25
			'3xl': '0.65625rem',  // 0.525 * 1.25
			'4xl': '0.7875rem',   // 0.63 * 1.25
			'5xl': '1.05rem',     // 0.84 * 1.25
			'6xl': '1.3125rem',   // 1.05 * 1.25
			'7xl': '1.575rem',    // 1.26 * 1.25
			'8xl': '2.1rem',      // 1.68 * 1.25
			'9xl': '2.8rem',      // 2.24 * 1.25
		  }
		  
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addBase, theme }) {
      addBase({
        '@media (min-width: 1024px)': {
          'html': {
            fontSize: '100%', // Tăng font size lên 3 lần cho desktop
          }
        }
      })
    }
  ],
};
