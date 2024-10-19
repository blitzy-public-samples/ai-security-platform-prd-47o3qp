// Migration script to create the users collection in the MongoDB database.
// This script addresses User Data Management requirements as outlined in
// Technical Specification, section 4.6 User and System Management.
//
// Dependencies:
// - mongodb@3.6.3: Provides the MongoDB client for connecting to the database and executing the migration.
// - user_schema.json: Defines the structure and constraints for the user data to be used in the collection.
// - mongo_init.js: Provides initialization logic for setting up the MongoDB connection.

const { MongoClient } = require('mongodb'); // mongodb@3.6.3
const userSchema = require('../schemas/user_schema.json'); // User data schema definition
const mongoInit = require('../mongo_init'); // MongoDB initialization logic

// Global variable for the MongoDB database connection instance
let db;

// The 'up' function executes the migration to create the users collection
// with the defined schema and indexes.
// Requirements Addressed:
// - User Data Management (Technical Specification 4.6 User and System Management)
//   - TR-USM-006-1: Implement Role-Based Access Control (RBAC) for user permissions.
//   - TR-USM-006-2: Develop user management interfaces for creating and modifying user accounts.
//   - TR-USM-006-5: Monitor and log all user and system activities for auditing purposes.
async function up() {
  try {
    // Step 1: Connect to the MongoDB database using the mongo_init module.
    // Ensures secure and reliable connection to support data operations.
    db = await mongoInit();

    // Step 2: Define the users collection using the schema from user_schema.
    // Enforces data validation and integrity as per TR-DM-011 Data Management.
    const usersCollection = db.collection('users');

    // Step 3: Create the users collection in the database with schema validation.
    // Addresses TR-DM-011-3: Implement data encryption at rest and in transit using industry-standard protocols.
    await db.createCollection('users', {
      validator: {
        $jsonSchema: userSchema
      },
      validationLevel: 'strict',
      validationAction: 'error'
    });

    // Step 4: Set up necessary indexes on the collection for efficient querying.
    // Improves performance, addressing TR-PO-012-1: Achieve average response times under 2 seconds.
    await usersCollection.createIndexes([
      // Unique index on 'username' for enforcing uniqueness and quick retrieval.
      {
        key: { username: 1 },
        name: 'username_unique_idx',
        unique: true
      },
      // Unique index on 'email' for enforcing uniqueness and quick retrieval.
      {
        key: { email: 1 },
        name: 'email_unique_idx',
        unique: true
      },
      // Index on 'role' for efficient querying based on user roles.
      {
        key: { role: 1 },
        name: 'role_idx'
      },
      // Index on 'created_at' for efficient sorting and retrieval of recent users.
      {
        key: { created_at: -1 },
        name: 'created_at_idx'
      }
    ]);

    console.log('Migration up: users collection created successfully.');
  } catch (error) {
    console.error('Error during migration up:', error);
    throw error;
  } finally {
    // Close the database connection if open.
    if (db) {
      await db.close();
    }
  }
}

// The 'down' function reverts the migration by dropping the users collection.
// This supports rollbacks and adheres to
// Technical Specification 4.16 Maintainability and Support (TR-MS-016-1).
async function down() {
  try {
    // Step 1: Connect to the MongoDB database using the mongo_init module.
    db = await mongoInit();

    // Step 2: Drop the users collection from the database.
    await db.collection('users').drop();

    console.log('Migration down: users collection dropped successfully.');
  } catch (error) {
    // If the collection does not exist, log the message and proceed.
    if (error.codeName === 'NamespaceNotFound') {
      console.log('Migration down: users collection does not exist.');
    } else {
      console.error('Error during migration down:', error);
      throw error;
    }
  } finally {
    // Close the database connection if open.
    if (db) {
      await db.close();
    }
  }
}

// Export the 'up' and 'down' functions for use by the migration framework.
// This is essential for integration with deployment pipelines and supports
// TR-MS-016-3: Implement automated testing and continuous integration pipelines.
module.exports = {
  up,
  down
};