"use server";

import prisma from "@/lib/prisma";// Adjust the path if needed
import { z } from "zod";

// Define input validation using Zod
const searchSchema = z.object({
  query: z.string().min(1, "Search query cannot be empty"),
});

export async function searchUsers(formData: FormData) {
  "use server";

  const query = formData.get("query") as string;

  const validation = searchSchema.safeParse({ query });
  if (!validation.success) {
    return { error: "Invalid search query" };
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: "insensitive" } }, // Case-insensitive search
          { name: { contains: query, mode: "insensitive" } }, // Search by name
        ],
      },
      select: {
        id: true,
        username: true,
        name: true,
        image: true,
      email:true
      },
      take: 10, // Limit results
    });
   

    return { users };
  } catch (error) {
    console.error("Search error:", error);
    return { error: "Something went wrong!" };
  }
}
