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
			'xs': '0.63rem',     // 0.75rem * 0.84
			'sm': '0.735rem',    // 0.875rem * 0.84
			'base': '0.84rem',     // 1rem * 0.84
			'lg': '0.945rem',    // 1.125rem * 0.84
			'xl': '1.05rem',     // 1.25rem * 0.84
			'2xl': '1.26rem',    // 1.5rem * 0.84
			'3xl': '1.575rem',   // 1.875rem * 0.84
			'4xl': '1.89rem',    // 2.25rem * 0.84
			'5xl': '2.52rem',    // 3rem * 0.84
			'6xl': '3.15rem',    // 3.75rem * 0.84
			'7xl': '3.78rem',    // 4.5rem * 0.84
			'8xl': '5.04rem',    // 6rem * 0.84
			'9xl': '6.72rem',    // 8rem * 0.84
		  },
		  spacing: {
			'0.5': '0.10417rem', // Default: 0.125rem / 1.2 (approximately)
			'1': '0.20833rem',   // Default: 0.25rem / 1.2 (approximately)
			'1.5': '0.3125rem', // Default: 0.375rem / 1.2
			'2': '0.41667rem',   // Default: 0.5rem / 1.2 (approximately)
			'3': '0.625rem', // Default: 0.75rem / 1.2
			'4': '0.83333rem',   // Default: 1rem / 1.2 (approximately)
			'5': '1.04167rem', // Default: 1.25rem / 1.2 (approximately)
			'6': '1.25rem',   // Default: 1.5rem / 1.2
			'7': '1.45833rem', // Default: 1.75rem / 1.2 (approximately)
			'8': '1.66667rem',   // Default: 2rem / 1.2 (approximately)
			'9': '1.875rem', // Default: 2.25rem / 1.2
			'10': '2.08333rem',  // Default: 2.5rem / 1.2 (approximately)
			'11': '2.29167rem', // Default: 2.75rem / 1.2 (approximately)
			'12': '2.5rem',  // Default: 3rem / 1.2
			'14': '2.91667rem',  // Default: 3.5rem / 1.2 (approximately)
			'16': '3.33333rem',  // Default: 4rem / 1.2 (approximately)
			'20': '4.16667rem',  // Default: 5rem / 1.2 (approximately)
			'24': '5rem', // Default: 6rem / 1.2
			'28': '5.83333rem',  // Default: 7rem / 1.2 (approximately)
        '32': '6.66667rem',  // Default: 8rem / 1.2 (approximately)
        '36': '7.5rem',   // Default: 9rem / 1.2
        '40': '8.33333rem',   // Default: 10rem / 1.2 (approximately)
        '44': '9.16667rem', // Default: 11rem / 1.2 (approximately)
        '48': '10rem', // Default: 12rem / 1.2
        '52': '10.83333rem',   // Default: 13rem / 1.2 (approximately)
        '56': '11.66667rem',  // Default: 14rem / 1.2 (approximately)
        '60': '12.5rem',   // Default: 15rem / 1.2
        '64': '13.33333rem',  // Default: 16rem / 1.2 (approximately)
        '72': '15rem', // Default: 18rem / 1.2
        '80': '16.66667rem',  // Default: 20rem / 1.2 (approximately)
        '96': '20rem', // Default: 24rem / 1.2
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
