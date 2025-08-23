const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './config.env' });

async function main() {
    const Db = process.env.ATLAS_URI;
    const client = new MongoClient(Db, { useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        await client.close();
    }
}

main();
