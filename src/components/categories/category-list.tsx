import { db } from "@/db";
import CategoryChip from "./category-chip";

export default async function CategoryList() {
  const categories = await db.category.findMany();
  const renderedCategories = categories.map((category) => {
    return <CategoryChip category={category} key={category.id} />;
  });

  return (
    <div className="flex flex-row flex-wrap gap-2">{renderedCategories}</div>
  );
}
