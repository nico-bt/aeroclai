"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { Roles } from "../../../types/globals";
import { revalidatePath } from "next/cache";

export async function setRole(formData: FormData) {
  // Check that the user trying to set the role is an admin
  const isAdmin = (await auth()).sessionClaims?.metadata?.role === "admin";
  if (!isAdmin) {
    throw new Error("Not Authorized");
  }

  const client = await clerkClient();

  const id = formData.get("id") as string;
  const newRole = formData.get("role") as Roles;

  try {
    const res = await client.users.updateUserMetadata(id, {
      publicMetadata: { role: newRole },
    });
    revalidatePath("/admin");
  } catch (err) {
    throw new Error("Failed to set error");
  }
}

export async function removeRole(formData: FormData) {
  const isAdmin = (await auth()).sessionClaims?.metadata?.role === "admin";
  if (!isAdmin) {
    throw new Error("Not Authorized");
  }

  const client = await clerkClient();
  const id = formData.get("id") as string;

  try {
    const res = await client.users.updateUserMetadata(id, {
      publicMetadata: { role: null },
    });
    revalidatePath("/admin");
  } catch (err) {
    throw new Error("Failed to remove role");
  }
}
