// Seed script for populating the incidents collection in the MongoDB database.
// This script provides initial data for testing and development purposes.

// Requirements Addressed:
// - Data Seeding for Development and Testing
//   Location: Technical Specification/4.11 Data Management
//   Description: Provide initial data for the incidents collection to facilitate development and testing of incident management functionalities.

// Dependencies:

// External Dependencies:
// - mongodb (version 3.6.3): Provides the MongoDB client for connecting to the database and executing operations.
const { MongoClient } = require('mongodb'); // mongodb@3.6.3

// Internal Dependencies:
// - initializeDatabase: Provides the MongoDB connection instance and utility functions for database operations.
//   Location: src/database/mongo_init.js
const initializeDatabase = require('../mongo_init');

// - incident_schema: Defines the structure for incident data to ensure consistency in seeding operations.
//   Location: src/database/schemas/incident_schema.json
const incidentSchema = require('../schemas/incident_schema.json'); // Assuming the schema is a JSON file

// Global Variables:
// - db: MongoDB database connection instance
let db = null;

/**
 * Populates the incidents collection with initial data using predefined sample incidents.
 *
 * Requirements Addressed:
 * - Data Seeding for Development and Testing
 *   Location: Technical Specification/4.11 Data Management
 *   Description: Provide initial data for the incidents collection to facilitate development and testing of incident management functionalities.
 *
 * @returns {Promise<void>} Resolves when the incidents are successfully inserted into the collection.
 */
async function seedIncidents() {
  try {
    // Step 1: Use the 'initializeDatabase' function to establish a connection to the MongoDB database.
    db = await initializeDatabase();

    // Step 2: Access the database connection instance.
    const incidentsCollection = db.collection('incidents');

    // Step 3: Define a set of sample incidents conforming to the 'incident_schema'.
    const sampleIncidents = [
      {
        // Incident 1
        title: "Unauthorized Access Attempt",
        description: "Multiple failed login attempts detected from IP address 192.168.1.100",
        status: "Open",
        detected_at: new Date(),
        resolved_at: null,
        user_id: null, // Foreign key to USER collection; null for unassigned
      },
      {
        // Incident 2
        title: "Malware Infection Detected",
        description: "Antivirus software detected malware on host PC-45",
        status: "In Progress",
        detected_at: new Date(),
        resolved_at: null,
        user_id: null,
      },
      {
        // Incident 3
        title: "Phishing Email Reported",
        description: "User reported a suspicious email attempting to collect confidential information",
        status: "Resolved",
        detected_at: new Date(Date.now() - 86400000), // Detected 1 day ago
        resolved_at: new Date(),
        user_id: null,
      },
    ];

    // Step 4: Insert the sample incidents into the 'incidents' collection in the database.
    const result = await incidentsCollection.insertMany(sampleIncidents);

    // Step 5: Log the successful insertion of the sample incidents.
    console.log(`${result.insertedCount} incidents have been seeded successfully.`);

  } catch (error) {
    // Log any errors that occur during the seeding process.
    console.error("An error occurred while seeding incidents:", error);
  } finally {
    // Close the database connection after the operations are complete.
    if (db) {
      await db.close();
    }
  }
}

// Execute the seedIncidents function.
seedIncidents();