"use client";

import paths from "@/paths";
import { Chip } from "@heroui/react";
import Link from "next/link";

type Category = {
  id: string | number;
  slug: string;
  name: string;
};

export default function CategoryChip({ category }: { category: Category }) {
  return (
    <div key={category.id}>
      <Link href={paths.categoryShow(category.slug)}>
        <Chip color="warning" variant="shadow">
          {category.name}
        </Chip>
      </Link>
    </div>
  );
}
