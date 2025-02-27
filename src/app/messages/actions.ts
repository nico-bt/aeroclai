"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { UserMessages } from "@/db/drizzle/schema";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

export async function createUserMessage(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error("User not found");

  const message = formData.get("message") as string;
  if (!message) {
    return;
  }

  await db.insert(UserMessages).values({
    user_id: user.id,
    message,
  });

  revalidatePath("/messages");
}

export async function deleteUserMessage(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("User not found");

  const messageId = formData.get("messageId") as string;
  console.log({ messageId });

  await db.delete(UserMessages).where(eq(UserMessages.id, +messageId));

  revalidatePath("/messages");
}
