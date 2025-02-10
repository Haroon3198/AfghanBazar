const express = require("express")
const serverless = require("serverless-http")
const { MongoClient } = require("mongodb")
const listingsRouter = require("../../src/routes/listings")
const notificationsRouter = require("../../src/routes/notifications")

const app = express()
app.use(express.json())

let cachedDb = null

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb
  }
  const client = await MongoClient.connect(process.env.MONGODB_URI)
  const db = client.db("afghan-bazar")
  cachedDb = db
  return db
}

app.use("/api/listings", async (req, res, next) => {
  const db = await connectToDatabase()
  listingsRouter(db)(req, res, next)
})

app.use("/api/notifications", async (req, res, next) => {
  const db = await connectToDatabase()
  notificationsRouter(db)(req, res, next)
})

module.exports.handler = serverless(app)

