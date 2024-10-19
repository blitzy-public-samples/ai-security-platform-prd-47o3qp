// Webpack configuration file for the React web application.
// Purpose: Configures Webpack to bundle JavaScript, TypeScript, and CSS files efficiently for development and production environments.

// Import required modules for Webpack configuration
const path = require('path'); // Node.js built-in module for handling file paths

// Import external dependencies with specified versions
const webpack = require('webpack'); // webpack v5.38.1 - Module bundler for JavaScript applications
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html-webpack-plugin (version specified in package.json)
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // clean-webpack-plugin (version specified in package.json)

// Ensure efficient bundling and optimization of assets for improved performance and compatibility across different environments.
// Requirement Addressed: Build and Deployment Optimization
// Location: Technical Specification/4.1 Dashboard

module.exports = (env, argv) => {
  // Determine if the build is in production mode
  const isProduction = argv.mode === 'production';

  return {
    // Define the entry point for the application
    // Entry: './src/web/src/index.tsx'
    // Requirement Addressed: Define entry point for application
    // Location: Technical Specification/4.1 Dashboard
    entry: './src/web/src/index.tsx',

    // Specify the output configuration
    // Output filename: 'bundle.js'
    // Output path: '/dist'
    // Requirement Addressed: Specify output settings
    // Location: Technical Specification/4.1 Dashboard
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    // Enable source maps for easier debugging in development mode
    // Requirement Addressed: Enable source maps for debugging
    // Location: Technical Specification/4.1 Dashboard, 'Enable source maps for easier debugging in development mode.'
    devtool: isProduction ? false : 'source-map',

    // Configure module rules to handle different file types
    // Set up loaders for JavaScript, TypeScript, and CSS files
    // Requirement Addressed: Set up module rules using appropriate loaders
    // Location: Technical Specification/4.1 Dashboard, 'Set up module rules to handle JavaScript, TypeScript, and CSS files using appropriate loaders.'
    module: {
      rules: [
        {
          // Transpile JavaScript and TypeScript files using Babel
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader', // babel-loader v8.2.2 - Transpiles ES6+ and TypeScript code
            options: {
              // Babel configuration is specified in '.babelrc'
              // Internal Dependency: '.babelrc' at 'src/web/.babelrc' - Configures Babel presets
              // Requirement Addressed: Integrate Babel loader with presets from '.babelrc'
              // Location: Technical Specification/4.1 Dashboard, 'Integrate Babel loader with presets from ".babelrc" to transpile modern JavaScript and TypeScript.'
            },
          },
        },
        {
          // Process CSS files and inject into the DOM
          test: /\.css$/,
          use: [
            'style-loader', // style-loader v2.0.0 - Injects CSS into the DOM
            'css-loader', // css-loader v5.2.6 - Interprets @import and url() in CSS
            {
              loader: 'postcss-loader', // postcss-loader v4.3.0 - Processes CSS with PostCSS
              options: {
                postcssOptions: {
                  // PostCSS configuration is specified in 'postcss.config.js'
                  // Internal Dependency: 'postcss.config.js' at 'src/web/postcss.config.js' - Configures PostCSS plugins
                  // Requirement Addressed: Configure PostCSS loader with plugins from 'postcss.config.js'
                  // Location: Technical Specification/4.1 Dashboard, 'Configure PostCSS loader with plugins from "postcss.config.js" for CSS processing.'
                  config: path.resolve(__dirname, 'postcss.config.js'),
                },
              },
            },
          ],
        },
        {
          // Load image files
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          // Load font files
          test: /\.(woff(2)?|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },

    // Include plugins for optimizing the build process
    // Requirement Addressed: Include plugins for optimizing the build process
    // Location: Technical Specification/4.1 Dashboard, 'Include plugins for optimizing the build process, such as "HtmlWebpackPlugin" for generating HTML files.'
    plugins: [
      // Generate an HTML file based on a template
      new HtmlWebpackPlugin({
        template: './src/web/public/index.html',
        minify: isProduction ? {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
        } : false,
      }),
      // Clean the output directory before each build
      new CleanWebpackPlugin(),
      // Define global constants for the application
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
      }),
    ],

    // Resolve file extensions for imports
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },

    // Development server configuration for development environment
    // Requirement Addressed: Development environment setup
    // Location: Technical Specification/4.1 Dashboard
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
      historyApiFallback: true, // Support HTML5 History API - required for React Router
      open: true, // Automatically open the browser after server has been started
    },

    // Optimization settings
    // Optimize the build for production by minimizing the output and enabling tree shaking
    // Requirement Addressed: Optimize the build for production
    // Location: Technical Specification/4.1 Dashboard, 'Optimize the build for production by minimizing the output and enabling tree shaking.'
    optimization: {
      minimize: isProduction,
      splitChunks: {
        chunks: 'all',
      },
      usedExports: true,
    },

    // Set mode based on the environment
    mode: isProduction ? 'production' : 'development',

    // Target the web platform
    target: 'web',

    // Performance settings
    performance: {
      hints: isProduction ? 'warning' : false,
    },
  };
};