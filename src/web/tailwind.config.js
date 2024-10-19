// Tailwind CSS Configuration File
// Tailwind CSS Version: 2.2.19
//
// This file configures Tailwind CSS to extend the default themes by defining custom colors,
// spacing, and responsive breakpoints. This ensures a consistent and responsive design
// across the web application.
//
// Requirements Addressed:
// - User Interface Design (Technical Specification/4.1 Dashboard)
//   Description: Ensure a consistent and responsive design across the web application
//   by applying global styles.

// External Dependency:
// Tailwind CSS v2.2.19 - Utility-first CSS framework for rapid UI development.
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // Specify the paths to all of the template files in the project.
  // This is necessary for Tailwind CSS to purge unused styles in production builds.
  //
  // Internal Dependency:
  // global.css (src/web/src/styles/global.css) - Applies global styles to ensure consistent design.
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],

  theme: {
    // Extending the default Tailwind CSS theme.
    extend: {
      // Custom Colors
      //
      // Adding custom color palette to maintain consistent branding and design throughout the application.
      // This addresses the need for a consistent UI design as per the User Interface Design requirement
      // (Technical Specification/4.1 Dashboard).
      colors: {
        primary: '#3498db',    // Primary brand color used for buttons, links, and highlights.
        secondary: '#2ecc71',  // Secondary color for accents and interactive elements.
        background: '#ecf0f1', // Default background color for pages and components.
        text: '#2c3e50',       // Standard text color for readability and consistency.
      },
      // Custom Spacing
      //
      // Defining custom spacing values to create a cohesive spacing system throughout the application.
      // This supports responsive design and layout consistency, addressing the User Interface Design requirement
      // (Technical Specification/4.1 Dashboard).
      spacing: {
        px: '1px',
        '0': '0',
        '1': '0.25rem',   // 4px
        '2': '0.5rem',    // 8px
        '3': '0.75rem',   // 12px
        '4': '1rem',      // 16px
        '5': '1.25rem',   // 20px
        '6': '1.5rem',    // 24px
        '8': '2rem',      // 32px
        '10': '2.5rem',   // 40px
        '12': '3rem',     // 48px
        '16': '4rem',     // 64px
        '20': '5rem',     // 80px
        '24': '6rem',     // 96px
        '32': '8rem',     // 128px
        '40': '10rem',    // 160px
        '48': '12rem',    // 192px
        '56': '14rem',    // 224px
        '64': '16rem',    // 256px
      },
      // Custom Breakpoints for Responsive Design
      //
      // Defining responsive breakpoints to ensure the application layout adapts seamlessly to different screen sizes.
      // This enhances user experience on various devices, addressing the User Interface Design requirement
      // (Technical Specification/4.1 Dashboard).
      screens: {
        'sm': '640px',   // Small devices (mobile)
        'md': '768px',   // Medium devices (tablet)
        'lg': '1024px',  // Large devices (laptop)
        'xl': '1280px',  // Extra large devices (desktop)
      },
    },
  },

  variants: {
    // Here we can specify which variants (responsive, hover, focus, etc.)
    // are enabled for each core plugin.
    // Enabling additional variants can help in implementing interactive UI components,
    // enhancing the user interface in line with the User Interface Design requirement
    // (Technical Specification/4.1 Dashboard).
  },

  plugins: [
    // Include any required Tailwind CSS plugins here.
    // Example: @tailwindcss/forms for better default form styles.
    // require('@tailwindcss/forms'),
  ],
};