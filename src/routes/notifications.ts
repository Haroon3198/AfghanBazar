import express from "express"
import { type Db, ObjectId } from "mongodb"
import type { Notification } from "../types"

const router = express.Router()

export default function (db: Db) {
  const collection = db.collection<Notification>("notifications")

  router.get("/", async (req, res) => {
    const notifications = await collection.find().toArray()
    const unread = await collection.countDocuments({ read: false })
    res.json({ unread, notifications })
  })

  router.post("/:id/read", async (req, res) => {
    const result = await collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { read: true } })
    if (result.modifiedCount > 0) {
      const notification = await collection.findOne({ _id: new ObjectId(req.params.id) })
      res.json(notification)
    } else {
      res.status(404).json({ message: "Notification not found" })
    }
  })

  return router
}

