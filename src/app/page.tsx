import CategoryCreateForm from "@/components/categories/category-create-form";
import CategoryList from "@/components/categories/category-list";
import LocationList from "@/components/locations/location-list";
import { fetchTopLocations } from "@/db/queries/locations";
import { Divider } from "@heroui/react";

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Locations</h1>
        <LocationList fetchData={() => fetchTopLocations()} />
      </div>
      <div className="border shadow py-3 px-2">
        <CategoryCreateForm />
        <Divider className="my-2" />
        <h3 className="text-lg">Categories</h3>
        <CategoryList />
      </div>
    </div>
  );
}
