"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createCommentSchema = z.object({
  content: z.string().min(3),
});

interface CreateCommentFormState {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function createComment(
  { locationId, parentId }: { locationId: string; parentId?: string },
  formState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const result = createCommentSchema.safeParse({
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ["You must sign in to do this."],
      },
    };
  }

  try {
    await db.comment.create({
      data: {
        content: result.data.content,
        locationId: locationId,
        parentId: parentId,
        userId: session.user.id,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong..."],
        },
      };
    }
  }

  const category = await db.category.findFirst({
    where: { locations: { some: { id: locationId } } },
  });

  if (!category) {
    return {
      errors: {
        _form: ["Failed to revalidate category"],
      },
    };
  }

  revalidatePath(paths.locationShow(category.slug, locationId));
  return {
    errors: {},
    success: true,
  };
}
