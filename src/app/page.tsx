import { db } from "@/db";
import Link from "next/link";

export default async function Home() {
  const locations = await db.location.findMany();

  const renderedLocations = locations.map((location) => {
    return (
      <Link
        key={location.id}
        href={`/locations/${location.id}`}
        className="flex justify-between items-center p-2 border rounded"
      >
        <div>{location.title}</div>
        <div>View</div>
      </Link>
    );
  });
  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Locations</h1>
        <Link className="border p-2 rounded" href="/locations/new">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderedLocations}</div>
    </div>
  );
}
