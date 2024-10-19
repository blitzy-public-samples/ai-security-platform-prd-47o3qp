/**
 * Seed Users Script
 * Seeds the users collection in the MongoDB database with initial user data for testing and development purposes.
 *
 * Requirements Addressed:
 * - User Data Management (Technical Specification/4.6 User and System Management)
 *   - TR-USM-006-1: Implement Role-Based Access Control (RBAC) for user permissions.
 *     Location: Technical Specification/4.6.4 Technical Requirements
 *   - TR-USM-006-2: Develop user management interfaces for creating and modifying user accounts.
 *     Location: Technical Specification/4.6.4 Technical Requirements
 *   - TR-USM-006-5: Monitor and log all user and system activities for auditing purposes.
 *     Location: Technical Specification/4.6.4 Technical Requirements
 */

// External dependency: mongodb version 3.6.3
const { MongoClient } = require('mongodb'); // Version: 3.6.3

// Internal dependencies
const mongo_init = require('../mongo_init'); // Provides initialization logic for setting up the MongoDB connection
const user_schema = require('../schemas/user_schema.json'); // Defines the structure and constraints for the user data to be seeded

// Global variable: MongoDB database connection instance
let db;

/**
 * Seeds the users collection with predefined user data.
 *
 * @param {MongoClient.Db} db - MongoDB database connection instance
 * @returns {Promise<void>} - Resolves when the user data is successfully seeded into the database.
 */
async function seedUsers(db) {
  try {
    // Step 1: Define an array of user objects adhering to the user_schema.
    // Including different user roles to implement RBAC as per TR-USM-006-1.
    const users = [
      {
        username: 'admin',
        password: 'hashed_admin_password', // In production, use a secure hashing algorithm.
        role: 'Administrator', // Role aligning with RBAC implementation.
        created_at: new Date(),
        // Additional fields as per user_schema (e.g., email, permissions).
      },
      {
        username: 'analyst1',
        password: 'hashed_analyst_password',
        role: 'Security Analyst',
        created_at: new Date(),
        // Additional fields as per user_schema.
      },
      {
        username: 'itmanager',
        password: 'hashed_itmanager_password',
        role: 'IT Manager',
        created_at: new Date(),
        // Additional fields as per user_schema.
      },
      {
        username: 'guestuser',
        password: 'hashed_guest_password',
        role: 'Guest User',
        created_at: new Date(),
        // Additional fields as per user_schema.
      },
      // Additional user entries can be added here.
    ];

    // Step 2: Insert the user objects into the users collection in the database.
    // Ensures that user accounts are properly set up for operational security (TR-USM-006-2).
    const result = await db.collection('users').insertMany(users);

    // Step 3: Log the successful seeding of user data.
    // Monitoring and logging user activities for auditing purposes (TR-USM-006-5).
    console.log(`Successfully seeded ${result.insertedCount} users into the database.`);
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

// Immediately-invoked async function to execute the seeding process.
(async function () {
  try {
    // Step 1: Connect to the MongoDB database using the mongo_init module.
    // Addresses operational efficiency within the platform (Technical Specification/4.6 User and System Management).
    const client = await mongo_init();

    // Assign the database instance to the global variable 'db'.
    db = client.db(); // Assumes the database name is set within mongo_init.

    // Step 2: Seed the users collection with predefined user data.
    await seedUsers(db);

    // Step 3: Close the database connection to free up resources.
    await client.close();
  } catch (error) {
    console.error('Error executing seed script:', error);
  }
})();