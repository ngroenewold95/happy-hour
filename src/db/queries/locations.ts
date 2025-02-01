import { db } from "@/db";
import type { Location } from "@prisma/client";

export type LocationForListDisplay = Location & {
  category: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

export async function fetchLocationsByCategorySlug(
  slug: string
): Promise<LocationForListDisplay[]> {
  return db.location.findMany({
    where: { category: { slug } },
    include: {
      category: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}

export async function fetchAllLocations(): Promise<LocationForListDisplay[]> {
  return db.location.findMany({
    include: {
      category: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}
