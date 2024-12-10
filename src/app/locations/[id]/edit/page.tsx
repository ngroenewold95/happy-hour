import LocationEditForm from "@/components/location-edit-form";
import { db } from "@/db";
import { notFound } from "next/navigation";

interface LocationEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function LocationEditPage(props: LocationEditPageProps) {
  const { id } = await props.params;

  const locationId = parseInt(id);
  const location = await db.location.findFirst({
    where: { id: locationId },
  });

  if (!location) {
    return notFound;
  }

  return (
    <div>
      <LocationEditForm location={location} />
    </div>
  );
}
