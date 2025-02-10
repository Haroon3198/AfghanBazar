import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { MongoClient } from "mongodb"
import listingsRouter from "./routes/listings"
import notificationsRouter from "./routes/notifications"

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

async function connectToDatabase() {
  try {
    await client.connect()
    console.log("Connected to MongoDB")
    const db = client.db("afghan-bazar")

    app.use("/api/listings", listingsRouter(db))
    app.use("/api/notifications", notificationsRouter(db))

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (error) {
    console.error("Failed to connect to MongoDB", error)
    process.exit(1)
  }
}

connectToDatabase()

