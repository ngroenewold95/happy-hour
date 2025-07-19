import type { LocationWithData } from "@/db/queries/locations";
import paths from "@/paths";
import Link from "next/link";

interface LocationListProps {
  fetchData: () => Promise<LocationWithData[]>;
}

export default async function LocationList({ fetchData }: LocationListProps) {
  const locations = await fetchData();
  const renderedLocations = locations.map((location) => {
    const categorySlug = location.category.slug;

    if (!categorySlug) {
      throw new Error("Need a slug to link to a location");
    }

    return (
      <div key={location.id} className="border rounded p-2">
        <Link href={paths.locationShow(categorySlug, location.id)}>
          <h3 className="text-lg font-bold">{location.title}</h3>
          <div className="flex flex-row gap-8">
            <p className="text-xs text-gray-400">By {location.user.name}</p>
            <p className="text-xs text-gray-400">
              {location._count.comments} comments
            </p>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="space-y-2">{renderedLocations}</div>;
}
