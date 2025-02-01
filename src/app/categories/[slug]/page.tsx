import LocationCreateForm from "@/components/locations/location-create-form";
import LocationList from "@/components/locations/location-list";
import { db } from "@/db";
import { fetchLocationsByCategorySlug } from "@/db/queries/locations";

interface CategoryShowPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryShowPage({
  params,
}: CategoryShowPageProps) {
  const { slug } = await params;
  const category = await db.category.findFirst({
    where: { slug },
  });
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{category?.name ?? slug}</h1>
        <LocationList fetchData={() => fetchLocationsByCategorySlug(slug)} />
      </div>

      <div>
        <LocationCreateForm slug={slug} />
      </div>
    </div>
  );
}
