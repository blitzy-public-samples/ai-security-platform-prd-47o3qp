/**
 * Seeds the playbooks collection in the MongoDB database with initial playbook data for testing and development purposes.
 *
 * Requirements Addressed:
 * - Dynamic Playbook Generation (Technical Specification/4.4 Dynamic Playbook Generation)
 *   - Utilize artificial intelligence to create and modify security playbooks in real-time based on emerging threats and organizational policies, ensuring responsive and adaptive incident handling strategies.
 *
 * Dependencies:
 * - Internal:
 *   - playbook_schema (from 'src/database/schemas/playbook_schema.json'): Defines the structure and constraints for the playbook data to be seeded.
 *   - initializeDatabase (from 'src/database/mongo_init.js'): Provides initialization logic for setting up the MongoDB connection.
 * - External:
 *   - mongodb (version 3.6.3): Provides the MongoDB client for connecting to the database and executing seeding operations.
 */

// External Dependencies
const { MongoClient } = require('mongodb'); // mongodb version 3.6.3

// Internal Dependencies
const playbookSchema = require('../schemas/playbook_schema.json');
const initializeDatabase = require('../mongo_init');

// Function to seed playbooks

/**
 * Seeds the playbooks collection with predefined playbook data.
 *
 * @param {MongoClient.Db} db - The MongoDB database connection instance.
 * @returns {Promise<void>} - Resolves when the playbook data is successfully seeded into the database.
 */
async function seedPlaybooks(db) {
    /**
     * Steps:
     * 1. Connect to the MongoDB database using the initializeDatabase function.
     * 2. Define an array of playbook objects adhering to the playbook_schema.
     * 3. Insert the playbook objects into the playbooks collection in the database.
     * 4. Log the successful seeding of playbook data.
     */

    try {
        // Step 2: Define an array of playbook objects adhering to the playbook_schema.
        const playbooks = [
            {
                name: 'Initial Incident Response',
                description: 'Playbook for initial incident response procedures.',
                steps: [
                    'Identify the scope of the incident.',
                    'Notify the incident response team.',
                    'Isolate affected systems.',
                    'Begin evidence collection.'
                ],
                created_at: new Date(),
                updated_at: new Date(),
                version: '1.0.0',
                active: true
            },
            {
                name: 'Malware Containment',
                description: 'Procedures for containing malware spread within the network.',
                steps: [
                    'Quarantine affected endpoints.',
                    'Disable compromised user accounts.',
                    'Update malware definitions.',
                    'Initiate malware scans on all systems.'
                ],
                created_at: new Date(),
                updated_at: new Date(),
                version: '1.0.0',
                active: true
            }
            // Additional playbook entries can be added here.
        ];

        // TODO: Validate playbooks against playbook_schema
        // As per the requirements in Technical Specification/4.4 Dynamic Playbook Generation, playbooks should adhere to organizational policies.

        // Step 3: Insert the playbook objects into the playbooks collection in the database.
        const collection = db.collection('playbooks');
        await collection.insertMany(playbooks);

        // Step 4: Log the successful seeding of playbook data.
        console.log('Successfully seeded playbook data into the database.');
    } catch (error) {
        console.error('An error occurred while seeding playbook data:', error);
    }
}

// Step 1: Connect to the MongoDB database using the initializeDatabase function.
initializeDatabase()
    .then(async (client) => {
        const db = client.db(); // MongoDB database connection instance

        await seedPlaybooks(db);

        // Close the database connection after seeding
        await client.close();
    })
    .catch((error) => {
        console.error('Database initialization failed:', error);
    });