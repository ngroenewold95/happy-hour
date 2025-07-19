import LocationList from "@/components/locations/location-list";
import { fetchPostsBySearchTerm } from "@/db/queries/locations";
import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: Promise<{ term: string }>;
}
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { term } = await searchParams;

  if (!term) {
    redirect("/");
  }
  return (
    <div>
      <LocationList fetchData={() => fetchPostsBySearchTerm(term)} />
    </div>
  );
}
