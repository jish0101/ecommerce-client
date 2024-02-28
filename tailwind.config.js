/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        container: '1440px',
      },
      screens: {
        xs: '320px',
        sm: '375px',
        sml: '500px',
        md: '667px',
        mdl: '768px',
        lg: '960px',
        lgl: '1024px',
        xl: '1280px',
      },
      fontFamily: {
        titleFont: 'Roboto',
        bodyFont: 'Poppins',
      },
      colors: {
        'yellow-100': '#fff6e1',
        'yellow-200': '#ffeccc',
        'yellow-300': '#ffd79b',
        'yellow-400': '#f0c14b',
        'yellow-500': '#ffae38',
        'yellow-600': '#ffa31b',
        'yellow-700': '#ff9d09',
        'yellow-800': '#e38800',
        'yellow-900': '#ca7800',
        'yellow-1000': '#b06700',
        'darkblue-100': '#f4f5f5',
        'darkblue-200': '#e8e8e8',
        'darkblue-300': '#cfcfcf',
        'darkblue-400': '#b5b5b5',
        'darkblue-500': '#9e9e9e',
        'darkblue-600': '#909090',
        'darkblue-700': '#878989',
        'darkblue-800': '#737777',
        'darkblue-900': '#646a6a',
        'darkblue-1000': '#131921',
        amazon_blue: '#131921',
        amazon_light: '#232F3E',
        amazon_gray: '#eaeded',
        amazon_lighter: '#37475A',
        amazon_yellow_dark: '#f7ca00',
        amazon_yellow: '#febd69',
        orange_100: '#f3a847',
        whiteText: '#ffffff',
        lightText: '#cccccc',
        quantity_box: '#F0F2F2',
        footerBottom: '#131a22',
      },
      boxShadow: {
        testShadow: '0px 0px 32px 1px rgba(199,199,199,1)',
        amazonInput: '0 0 3px 2px rgb(228 121 17/50%)',
      },
    },
  },

  plugins: [],
};
