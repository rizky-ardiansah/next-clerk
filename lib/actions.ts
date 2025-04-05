"use server";

import { auth } from "@clerk/nextjs/server";
import { CreatePostInput } from "./types";
import prisma from "./db";

export async function createPost(data: CreatePostInput) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, message: "Unauthorized" };
    }

    const post = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: userId,
      },
    });
    return { success: true, data: post };
  } catch (error) {
    console.error("Error creating post:", error);
    return { success: false };
  }
}
