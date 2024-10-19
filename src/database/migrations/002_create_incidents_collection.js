// Import the MongoDB client from the 'mongodb' module (version 3.6.3)
/* External Dependency: mongodb version 3.6.3 */
const { MongoClient } = require('mongodb');

// Import the initializeDatabase function to establish a connection to the MongoDB database
/* Internal Dependency: initializeDatabase from 'src/database/mongo_init.js' */
const { initializeDatabase } = require('../mongo_init');

// Import the incident schema to define the structure for incident data
/* Internal Dependency: incident_schema from 'src/database/schemas/incident_schema.json' */
const incidentSchema = require('../schemas/incident_schema.json');

/**
 * Function: createIncidentsCollection
 * Description:
 * Creates the 'incidents' collection in the MongoDB database using the defined schema and sets up necessary indexes.
 *
 * Requirements Addressed:
 * - Incident Data Management (Technical Specification/4.5 Comprehensive Case Management)
 *   - Maintain detailed logs of all incident-related activities, support comprehensive audit trails, and facilitate easy retrieval and analysis of historical data to support ongoing security operations and compliance requirements.
 *
 * Returns:
 * - Promise: Resolves when the collection is successfully created and indexes are set up.
 */
async function createIncidentsCollection() {
    try {
        // Step 1: Use the 'initializeDatabase' function to establish a connection to the MongoDB database
        const db = await initializeDatabase();

        // Step 2: Access the database connection instance
        // The 'db' variable now holds the database connection instance

        // Step 3: Check if the 'incidents' collection already exists
        const collectionExists = await db.listCollections({ name: 'incidents' }, { nameOnly: true }).hasNext();

        if (!collectionExists) {
            // Step 4: Define the schema for the 'incidents' collection using the 'incident_schema'
            // Create the 'incidents' collection with schema validation based on 'incident_schema'
            await db.createCollection('incidents', {
                validator: {
                    $jsonSchema: incidentSchema,
                },
                validationLevel: 'strict',
                validationAction: 'error',
            });

            // Step 5: Set up necessary indexes on the 'incidents' collection to optimize query performance
            // Index on 'incidentId' field for unique identification of incidents
            // Index on 'status' field to allow efficient querying of incident statuses
            // Index on 'detectedAt' field for sorting and querying based on detection time
            await db.collection('incidents').createIndexes([
                {
                    key: { incidentId: 1 },
                    name: 'idx_incidentId',
                    unique: true,
                },
                {
                    key: { status: 1 },
                    name: 'idx_status',
                },
                {
                    key: { detectedAt: -1 },
                    name: 'idx_detectedAt',
                },
            ]);

            // Step 6: Log the successful creation of the collection and indexes
            console.log("Successfully created 'incidents' collection with schema validation and indexes.");
        } else {
            // If the collection already exists, inform the user
            console.log("'incidents' collection already exists. Skipping creation.");
        }
    } catch (error) {
        // Handle any errors that occurred during the creation process
        console.error("An error occurred while creating the 'incidents' collection: ", error);
        throw error;
    }
}

// Execute the migration
createIncidentsCollection()
    .then(() => {
        console.log("Migration completed successfully.");
        process.exit(0);
    })
    .catch((error) => {
        console.error("Migration failed: ", error);
        process.exit(1);
    });