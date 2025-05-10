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
			'xs': '0.21rem',     // Cho text nhỏ nhất (labels, captions)
			'sm': '0.245rem',    // Cho text phụ (descriptions)
			'base': '0.28rem',   // Cho text thường
			'lg': '0.315rem',    // Cho heading phụ
			'xl': '0.35rem',     // Cho heading chính
			'2xl': '0.42rem',    // Cho heading lớn
			'3xl': '0.525rem',   // Cho heading rất lớn
			'4xl': '0.63rem',    // Cho display text
			'5xl': '0.84rem',    // Cho display text lớn
			'6xl': '1.05rem',    // Cho display text rất lớn
			'7xl': '1.26rem',    // Cho display text cực lớn
			'8xl': '1.68rem',    // Cho display text siêu lớn
			'9xl': '2.24rem',    // Cho display text khổng lồ
		  }
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addBase, theme }) {
      addBase({
        '@media (min-width: 1024px)': {
          'html': {
            fontSize: '300%', // Tăng font size lên 3 lần cho desktop
          }
        }
      })
    }
  ],
};
