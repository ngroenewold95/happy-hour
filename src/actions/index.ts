"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createLocation(
  formState: { message: string },
  formData: FormData
) {
  try {
    const title = formData.get("title");
    const content = formData.get("content");

    if (typeof title !== "string" || title.length < 3) {
      return { message: "Title must be at least 3 characters long." };
    }

    if (typeof content !== "string" || content.length < 10) {
      return { message: "Content must be at least 10 characters long." };
    }

    await db.location.create({
      data: { title, content },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return { message: "Something went wrong..." };
    }
  }

  revalidatePath("/");
  redirect("/");
}

export async function editLocation(id: number, content: string) {
  await db.location.update({
    where: { id },
    data: { content },
  });

  revalidatePath(`/locations/${id}`);
  redirect(`/locations/${id}`);
}

export async function deleteLocation(id: number) {
  await db.location.delete({ where: { id } });

  revalidatePath("/");
  redirect("/");
}
