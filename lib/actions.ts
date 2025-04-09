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

export async function getPostById(postId: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { author: true },
    });

    if (!post) {
      return { success: false, message: "Post not found" };
    }

    return { success: true, data: post };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function getPostForEdit(postId: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, message: "Unauthorized" };
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        id: true,
        title: true,
        content: true,
        authorId: true,
      },
    });

    if (!post) {
      return { success: false, message: "Post not found" };
    }

    if (post.authorId !== userId) {
      return { success: false, message: "You don't have permission" };
    }
    return { success: true, data: post };
  } catch (error) {
    console.error("Error creating post:", error);
    return { success: false };
  }
}

export async function updatePost(postId: string, data: CreatePostInput) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, message: "Unauthorized" };
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        id: true,
        authorId: true,
      },
    });

    if (!post) {
      return { success: false, message: "Post not found" };
    }

    if (post.authorId !== userId) {
      return { success: false, message: "You don't have permission" };
    }

    await prisma.post.update({
      where: { id: postId },
      data: {
        title: data.title,
        content: data.content,
        updatedAt: new Date(),
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating post:", error);
    return { success: false };
  }
}

export async function deletePost(postId: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, message: "Unauthorized" };
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        id: true,
        authorId: true,
      },
    });

    if (!post) {
      return { success: false, message: "Post not found" };
    }

    if (post.authorId !== userId) {
      return { success: false, message: "You don't have permission" };
    }
    await prisma.post.delete({
      where: { id: postId },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { success: false };
  }
}
