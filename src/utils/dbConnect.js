import { MongoClient } from 'mongodb'

let cashedDB

export async function connectToDatabase() {
  if (cashedDB) {
    return cashedDB
  }

  let client = new MongoClient('mongodb://localhost:27017')

  await client.connect()

  cashedDB = client.db('blogs')

  return cashedDB
}
