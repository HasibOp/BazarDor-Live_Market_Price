import dns from "node:dns";
import { MongoClient } from "mongodb";

// Node's resolver can refuse SRV lookups (querySrv ECONNREFUSED) on some
// networks even when the OS resolver works; use public DNS for mongodb+srv.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const uri = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017";
const globalForMongo = globalThis as typeof globalThis & {
  _bazarMongoClient?: MongoClient;
};

if (!globalForMongo._bazarMongoClient) {
  globalForMongo._bazarMongoClient = new MongoClient(uri, {
    serverSelectionTimeoutMS: 8000,
  });
}

export const db = globalForMongo._bazarMongoClient.db("bazardor");

