// Purpose: Initializes the MongoDB connection and provides utility functions for database operations,
// including setting up collections and seeding initial data.

// Addressing Requirement:
// Implements robust data storage, retrieval, and processing systems to ensure data integrity, availability,
// and compliance with retention policies across all platform components.
// Location: Technical Specification/4.11 Data Management (TR-DM-011)

// Import the MongoDB client from the 'mongodb' module.
// Version: 3.6.3
const { MongoClient } = require('mongodb'); // mongodb@3.6.3

// Import internal dependencies for schemas and migrations.
// These imports define the structure of data and ensure consistency in database operations.

// User schema: Defines the structure for user data.
const userSchema = require('./schemas/user_schema.json');

// Incident schema: Defines the structure for incident data.
const incidentSchema = require('./schemas/incident_schema.json');

// Playbook schema: Defines the structure for playbook data.
const playbookSchema = require('./schemas/playbook_schema.json');

// Migration scripts to create collections in the database.
const createUsersCollection = require('./migrations/001_create_users_collection.js');
const createIncidentsCollection = require('./migrations/002_create_incidents_collection.js');
const createPlaybooksCollection = require('./migrations/003_create_playbooks_collection.js');

// Seeder scripts to populate the database with initial data.
const seedUsers = require('./seeds/seed_users.js');
const seedIncidents = require('./seeds/seed_incidents.js');
const seedPlaybooks = require('./seeds/seed_playbooks.js');

// Global variable to hold the MongoDB database connection instance.
let db; // MongoDB database connection instance

/**
 * Establishes a connection to the MongoDB database and returns the connection instance.
 * 
 * Steps:
 *  - Import the MongoDB client from the 'mongodb' module.
 *  - Connect to the MongoDB server using the connection URI and options.
 *  - Return the database connection instance.
 * 
 * @returns {Promise<MongoClient>} The established connection to the MongoDB database.
 * 
 * Technical Specification Reference:
 *  - Implements robust data storage and processing systems.
 *    Location: Technical Specification/4.11 Data Management (TR-DM-011)
 */
async function initializeDatabase() {
    try {
        // Connection URI and options.
        // Use environment variables for configuration to enhance security and flexibility.
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
        const dbName = process.env.DB_NAME || 'security_orchestration_platform';

        // Options to pass to the MongoClient for connection.
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Additional options can be specified here.
        };

        // Connect to the MongoDB server.
        const client = await MongoClient.connect(uri, options);
        
        // Assign the database connection instance to the global variable.
        db = client.db(dbName);

        console.log('Connected to MongoDB database:', dbName);

        // Run migrations to set up collections.
        await runMigrations();

        // Seed the database with initial data.
        await seedDatabase();

        // Return the database connection instance.
        return db;
    } catch (error) {
        console.error('Error initializing the database:', error);
        throw error;
    }
}

/**
 * Runs migration scripts to set up database collections.
 * 
 * Technical Specification Reference:
 *  - Ensures data structures are properly defined and collections are initialized.
 *    Location: Technical Specification/4.11 Data Management (TR-DM-011)
 */
async function runMigrations() {
    try {
        // Create 'users' collection with the defined schema.
        await createUsersCollection(db, userSchema);

        // Create 'incidents' collection with the defined schema.
        await createIncidentsCollection(db, incidentSchema);

        // Create 'playbooks' collection with the defined schema.
        await createPlaybooksCollection(db, playbookSchema);

        console.log('Database migrations completed successfully.');
    } catch (error) {
        console.error('Error running database migrations:', error);
        throw error;
    }
}

/**
 * Seeds the database with initial data.
 * 
 * Technical Specification Reference:
 *  - Provides initial data to ensure the system has default users, incidents, and playbooks.
 *    Location: Technical Specification/4.11 Data Management (TR-DM-011)
 */
async function seedDatabase() {
    try {
        // Seed 'users' collection with initial data.
        await seedUsers(db);

        // Seed 'incidents' collection with initial data.
        await seedIncidents(db);

        // Seed 'playbooks' collection with initial data.
        await seedPlaybooks(db);

        console.log('Database seeding completed successfully.');
    } catch (error) {
        console.error('Error seeding the database:', error);
        throw error;
    }
}

// Export the initializeDatabase function for use in other parts of the application.
module.exports = {
    initializeDatabase,
    // Getter for the database connection instance.
    getDb: () => db,
};