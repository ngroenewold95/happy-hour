"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";
import type { Location } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createLocationSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

interface CreateLocationFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}
export async function createLocation(
  slug: string,
  formState: CreateLocationFormState,
  formData: FormData
): Promise<CreateLocationFormState> {
  const result = createLocationSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return {
      errors: { _form: ["You need to be signed in to create a location"] },
    };
  }
  const category = await db.category.findFirst({
    where: { slug },
  });

  if (!category) {
    return { errors: { _form: ["Invalid category"] } };
  }

  let location: Location;
  try {
    location = await db.location.create({
      data: {
        title: result.data.title.trim(),
        content: result.data.content.trim(),
        categoryId: category.id,
        userId: session.user.id,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { errors: { _form: [err.message] } };
    } else {
      return {
        errors: { _form: ["An error occurred while creating the location"] },
      };
    }
  }

  revalidatePath("/");
  redirect(paths.locationShow(slug, location.id));
}
