import dns from "node:dns";
import { MongoClient } from "mongodb";

const PUBLIC_DNS = ["8.8.8.8", "1.1.1.1"];
dns.setServers(PUBLIC_DNS);
dns.promises.setServers(PUBLIC_DNS);

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

