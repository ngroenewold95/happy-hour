import { db } from "@/db";
import paths from "@/paths";
import { Chip } from "@heroui/react";
import Link from "next/link";

export default async function CategoryList() {
  const categories = await db.category.findMany();
  const renderedCategories = categories.map((category) => {
    return (
      <div key={category.id}>
        <Link href={paths.categoryShow(category.slug)}>
          <Chip color="warning" variant="shadow">
            {category.name}
          </Chip>
        </Link>
      </div>
    );
  });

  return (
    <div className="flex flex-row flex-wrap gap-2">{renderedCategories}</div>
  );
}
