"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

export async function editLocation(id: number, content: string) {
  await db.location.update({
    where: { id },
    data: { content },
  });

  redirect(`/locations/${id}`);
}

export async function deleteLocation(id: number) {
  await db.location.delete({ where: { id } });

  redirect("/");
}
