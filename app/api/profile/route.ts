import { NextResponse } from "next/server"

export async function PUT(request: Request) {
  const data = await request.json()

  // In a real application, you would update the user's profile in your database here
  // For this example, we'll just return the data as if it was successfully updated

  return NextResponse.json({ message: "Profile updated successfully", user: data })
}

