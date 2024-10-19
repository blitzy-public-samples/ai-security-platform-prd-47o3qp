/**
 * PostCSS Configuration File
 *
 * This file configures PostCSS to process and optimize our CSS files using the specified plugins.
 * It includes Tailwind CSS and Autoprefixer to ensure efficient processing, improved performance,
 * and cross-browser compatibility for the frontend of our platform.
 *
 * Requirements Addressed:
 * - **Build and Deployment Optimization** (`Technical Specification/4.1 Dashboard`)
 *   - Ensures efficient processing and optimization of CSS files for improved performance.
 *   - Provides cross-browser compatibility by adding necessary vendor prefixes.
 *   - Location in documentation: Technical Specification, Section 4.1 Dashboard
 *
 * Dependencies:
 * - **External Dependencies**:
 *   - `postcss` (version 8.3.6): Core PostCSS library to process CSS files with plugins.
 *   - `tailwindcss` (version 2.2.19): Utility-first CSS framework for rapid UI development.
 *   - `autoprefixer` (version 10.2.6): Adds vendor prefixes to CSS rules for cross-browser compatibility.
 * - **Internal Dependencies**:
 *   - `tailwind.config.js` (located at `src/web/tailwind.config.js`): Configures Tailwind CSS with custom themes and responsive design settings.
 */

// Step 1: Import required PostCSS plugins including Tailwind CSS and Autoprefixer

// Import Tailwind CSS plugin for PostCSS processing
// Purpose: Provides utility classes for rapid UI development.
// Version specified: 2.2.19
const tailwindcss = require('tailwindcss'); // tailwindcss v2.2.19

// Import Autoprefixer plugin to add vendor prefixes
// Purpose: Ensures cross-browser compatibility by adding necessary vendor prefixes to CSS rules.
// Version specified: 10.2.6
const autoprefixer = require('autoprefixer'); // autoprefixer v10.2.6

/**
 * Step 2: Define the plugins array with Tailwind CSS and Autoprefixer
 *
 * Global Variable:
 * - `plugins`: Array of PostCSS plugins used for processing CSS files.
 *
 * This setup addresses the requirement for **Build and Deployment Optimization** by:
 * - Tailwind CSS: Generates optimized CSS by including only the styles used in the project, reducing file size.
 * - Autoprefixer: Automatically adds vendor prefixes, enhancing browser support and compatibility.
 *
 * Location in documentation:
 * - Technical Specification, Section 4.1 Dashboard
 */
const plugins = [
  // Include Tailwind CSS plugin with reference to the custom configuration file
  tailwindcss('./tailwind.config.js'), // Internal dependency: Custom Tailwind CSS configuration

  // Include Autoprefixer plugin
  autoprefixer,
];

/**
 * Step 3: Export the configuration object for use in the build process
 *
 * By exporting this configuration, build tools like Webpack or Gulp can utilize PostCSS
 * with the specified plugins to process CSS files during the build.
 *
 * This fulfills the step:
 * - "Export the configuration object for use in the build process."
 *
 * Requirement Addressed:
 * - **Build and Deployment Optimization** (`Technical Specification/4.1 Dashboard`)
 *   - Ensures that CSS files are processed efficiently during the build, improving performance and compatibility.
 */
module.exports = {
  plugins,
};