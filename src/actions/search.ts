"use server";

import { redirect } from "next/navigation";

export async function search(formData: FormData) {
  const term = formData.get("term");

  if (typeof term !== "string" || !term.trim()) {
    return redirect("/");
  }

  // Redirect to the search results page with the search term
  redirect(`/search?term=${term.trim()}`);
}
