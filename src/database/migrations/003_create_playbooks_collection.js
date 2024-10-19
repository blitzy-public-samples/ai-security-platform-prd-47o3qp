// Migration script to create the playbooks collection in the MongoDB database.
// Ensures the collection is set up with the appropriate schema and indexes.

// Requirements Addressed:
// - Dynamic Playbook Generation (Technical Specification/4.4 Dynamic Playbook Generation)
//   - Utilize artificial intelligence to create and modify security playbooks in real-time based on emerging threats and organizational policies, ensuring responsive and adaptive incident handling strategies.

// External Dependencies
const { MongoClient } = require('mongodb'); // MongoDB client for connecting to the database and executing the migration. Version: 3.6.3

// Internal Dependencies
const initializeDatabase = require('../mongo_init'); // Provides initialization logic for setting up the MongoDB connection.
const playbookSchema = require('../schemas/playbook_schema.json'); // Defines the structure and constraints for the playbook data to be used in the collection.

// Global Variables
// - db: MongoDB database connection instance

/**
 * Executes the migration to create the playbooks collection with the defined schema and indexes.
 *
 * @param {MongoClient} db - MongoDB database connection instance.
 * @returns {Promise<void>} - Resolves when the collection is successfully created.
 *
 * Steps:
 * 1. Connect to the MongoDB database using the initializeDatabase function.
 * 2. Define the playbooks collection using the schema from playbookSchema.
 * 3. Create the playbooks collection in the database with schema validation.
 * 4. Set up necessary indexes on the collection for efficient querying.
 *
 * Requirements Addressed:
 * - TR-DPG-004-1: Develop AI algorithms for generating standardized playbooks compatible with XSOAR.
 * - TR-DPG-004-5: Ensure version control and audit logging for all playbook modifications.
 *   - Location: Technical Specification/4.4.4 Technical Requirements
 */
async function up(db) {
  // Step 1: Connect to the MongoDB database using the initializeDatabase function.
  if (!db) {
    db = await initializeDatabase(); // Initialize the database connection.
  }

  const collectionName = 'playbooks';

  try {
    // Step 2: Define the playbooks collection using the schema from playbookSchema.
    // Apply schema validation to ensure that all inserted documents conform to the defined schema.
    const collectionOptions = {
      validator: {
        $jsonSchema: playbookSchema
      },
      validationLevel: 'strict',
      validationAction: 'error'
    };

    // Step 3: Create the playbooks collection in the database with schema validation.
    const collections = await db.listCollections({ name: collectionName }).toArray();
    if (collections.length === 0) {
      // Create the collection because it does not exist.
      await db.createCollection(collectionName, collectionOptions);
      console.log(`Created collection '${collectionName}' with schema validation.`);
    } else {
      console.log(`Collection '${collectionName}' already exists. Updating schema validation.`);
      // Update the existing collection's schema validator.
      await db.command({
        collMod: collectionName,
        validator: collectionOptions.validator,
        validationLevel: collectionOptions.validationLevel,
        validationAction: collectionOptions.validationAction
      });
      console.log(`Updated schema validation for collection '${collectionName}'.`);
    }

    // Step 4: Set up necessary indexes on the collection for efficient querying.
    const playbooksCollection = db.collection(collectionName);

    // Index on 'name' field to ensure unique playbook names.
    await playbooksCollection.createIndex(
      { name: 1 },
      {
        name: 'idx_playbook_name',
        unique: true // Enforce unique playbook names.
      }
    );

    // Index on 'updated_at' field to facilitate sorting and querying by the last modification date.
    await playbooksCollection.createIndex(
      { updated_at: -1 },
      {
        name: 'idx_updated_at'
      }
    );

    // Indexes support TR-DPG-004-5 by enabling efficient version control and audit logging of playbook modifications.

    console.log('Migration up: Playbooks collection created and indexes established successfully.');
  } catch (error) {
    console.error('Migration up: Error creating playbooks collection:', error);
    throw error;
  }
}

/**
 * Reverts the migration by dropping the playbooks collection.
 *
 * @param {MongoClient} db - MongoDB database connection instance.
 * @returns {Promise<void>} - Resolves when the collection is successfully dropped.
 *
 * Steps:
 * 1. Connect to the MongoDB database using the initializeDatabase function.
 * 2. Drop the playbooks collection from the database.
 *
 * Requirement Addressed:
 * - Allows rollback to maintain data integrity and consistency.
 *   - Location: General best practices for database migrations.
 */
async function down(db) {
  // Step 1: Connect to the MongoDB database using the initializeDatabase function.
  if (!db) {
    db = await initializeDatabase();
  }

  const collectionName = 'playbooks';

  try {
    // Step 2: Drop the playbooks collection from the database.
    const collections = await db.listCollections({ name: collectionName }).toArray();
    if (collections.length > 0) {
      await db.collection(collectionName).drop();
      console.log(`Migration down: Dropped collection '${collectionName}'.`);
    } else {
      console.warn(`Migration down: Collection '${collectionName}' does not exist.`);
    }
  } catch (error) {
    console.error('Migration down: Error dropping playbooks collection:', error);
    throw error;
  }
}

module.exports = {
  up,
  down
};