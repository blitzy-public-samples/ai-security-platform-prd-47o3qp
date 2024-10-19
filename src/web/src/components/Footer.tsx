// Import necessary modules and components
import React from 'react'; // React 17.0.2
import { Link } from 'react-router-dom'; // React Router 5.2.0
import getAuthToken from '../utils/auth'; // To retrieve the authentication token if needed for user-specific links
import apiRequest from '../utils/api'; // To make HTTP requests if needed for dynamic content in the footer
import '../styles/global.css'; // Import global CSS styles for consistent styling across the application
// (Addresses Technical Specification/4.1 Dashboard: Ensure a consistent and responsive design by applying global styles)

// Global constants
const FOOTER_HEIGHT = '60px'; // Defines the fixed height for the footer component

/**
 * Footer Component
 * 
 * Renders the footer component with links to important pages and social media icons.
 * Applies global styles to ensure a consistent and responsive design across the web application.
 * 
 * Requirements Addressed:
 * - User Interface Design: Ensure a consistent and responsive design across the web application by applying global styles.
 *   (Technical Specification/4.1 Dashboard)
 * 
 * @returns {JSX.Element} The rendered footer component.
 */
const Footer: React.FC = () => {
    // Retrieve the authentication token using getAuthToken
    // Used to conditionally render user-specific links based on authentication status
    const authToken = getAuthToken();

    // Define base navigation links
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Incidents', path: '/incidents' },
        { name: 'Playbooks', path: '/playbooks' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Settings', path: '/settings' },
    ];

    // Conditionally add user-specific links based on authentication status
    if (authToken) {
        // User is authenticated
        navLinks.push({ name: 'Profile', path: '/profile' });
        navLinks.push({ name: 'Logout', path: '/logout' });
    } else {
        // User is not authenticated
        navLinks.push({ name: 'Login', path: '/login' });
        navLinks.push({ name: 'Register', path: '/register' });
    }

    // Define social media links with corresponding icons
    const socialMediaLinks = [
        { name: 'Twitter', url: 'https://twitter.com/company_account', icon: 'twitter-icon' },
        { name: 'LinkedIn', url: 'https://linkedin.com/company/company_account', icon: 'linkedin-icon' },
        { name: 'GitHub', url: 'https://github.com/company_account', icon: 'github-icon' },
    ];

    return (
        // Apply global styles and set footer height using the FOOTER_HEIGHT constant
        // Ensures consistent styling across the application as per Technical Specification/4.1 Dashboard
        <footer style={{ height: FOOTER_HEIGHT }} className="footer">
            <div className="footer-content">
                {/* Navigation Links */}
                {/* Render navigation links using global styles for consistent appearance */}
                <nav className="footer-nav">
                    {navLinks.map((link) => (
                        // Use React Router Link for internal navigation
                        <Link key={link.name} to={link.path} className="footer-link">
                            {link.name}
                        </Link>
                    ))}
                </nav>
                {/* Social Media Icons */}
                {/* Render social media icons with links to company profiles */}
                <div className="footer-social-media">
                    {socialMediaLinks.map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                        >
                            {/* Display social media icons; icons should be stored in the public assets directory */}
                            <img
                                src={`/assets/icons/${social.icon}.svg`}
                                alt={`${social.name} Icon`}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;