import { db } from "@/db";
import { notFound } from "next/navigation";

interface LocationShowProps {
  locationId: string;
}

export default async function LocationShow({ locationId }: LocationShowProps) {
  const location = await db.location.findFirst({ where: { id: locationId } });

  if (!location) {
    notFound();
  }
  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{location.title}</h1>
      <p className="p-4 border rounded">{location.content}</p>
    </div>
  );
}
