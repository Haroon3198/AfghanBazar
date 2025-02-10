import express from "express"
import { type Db, ObjectId } from "mongodb"
import type { Listing } from "../types"

const router = express.Router()

export default function (db: Db) {
  const collection = db.collection<Listing>("listings")

  router.get("/", async (req, res) => {
    const listings = await collection.find().toArray()
    res.json(listings)
  })

  router.get("/:id", async (req, res) => {
    const listing = await collection.findOne({ _id: new ObjectId(req.params.id) })
    if (listing) {
      res.json(listing)
    } else {
      res.status(404).json({ message: "Listing not found" })
    }
  })

  router.post("/", async (req, res) => {
    const newListing: Listing = {
      ...req.body,
      createdAt: new Date(),
    }
    const result = await collection.insertOne(newListing)
    res.status(201).json({ ...newListing, _id: result.insertedId })
  })

  return router
}

