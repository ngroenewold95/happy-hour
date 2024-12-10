import { db } from "@/db";
import { redirect } from "next/navigation";

export default function LocationCreatePage() {
  async function createLocation(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    db.location.create({
      data: { title, content },
    });

    redirect("/");
  }
  return (
    <form action={createLocation}>
      <h3 className="font-bold m-3">Create a Location</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          ></input>
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="content">
            Content
          </label>
          <textarea
            name="content"
            className="border rounded p-2 w-full"
            id="content"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-200 p-2 rounded">
          Create
        </button>
      </div>
    </form>
  );
}
