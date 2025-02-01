"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";
import type { Category } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createCategorySchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, {
      message:
        "Please enter only letters and single spaces between words. Numbers, special characters, and multiple spaces are not allowed.",
    }),
  description: z.string().min(10),
});

interface CreateCategoryFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createCategory(
  formState: CreateCategoryFormState,
  formData: FormData
): Promise<CreateCategoryFormState> {
  const result = createCategorySchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: { _form: ["You need to be signed in to create a category"] },
    };
  }

  let category: Category;
  try {
    category = await db.category.create({
      data: {
        name: result.data.name.trim(),
        slug: result.data.name.toLowerCase().trim().replaceAll(/\s+/g, "-"),
        description: result.data.description.trim(),
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { errors: { _form: [err.message] } };
    } else {
      return {
        errors: { _form: ["An error occurred while creating the category"] },
      };
    }
  }

  revalidatePath("/");
  redirect(paths.categoryShow(category.slug));
}
