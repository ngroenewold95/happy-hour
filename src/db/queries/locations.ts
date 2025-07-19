import { db } from "@/db";
import type { Location } from "@prisma/client";

export type LocationWithData = Location & {
  category: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

export function fetchAllLocations(): Promise<LocationWithData[]> {
  return db.location.findMany({
    include: {
      category: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}

export function fetchLocationsByCategorySlug(
  slug: string
): Promise<LocationWithData[]> {
  return db.location.findMany({
    where: { category: { slug } },
    orderBy: [{ comments: { _count: "desc" } }],
    include: {
      category: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}

export function fetchTopLocations(): Promise<LocationWithData[]> {
  return db.location.findMany({
    orderBy: [{ comments: { _count: "desc" } }],
    include: {
      category: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
    take: 10,
  });
}

export function fetchPostsBySearchTerm(
  term: string
): Promise<LocationWithData[]> {
  return db.location.findMany({
    where: {
      OR: [
        { title: { contains: term, mode: "insensitive" } },
        { content: { contains: term, mode: "insensitive" } },
      ],
    },
    orderBy: [{ comments: { _count: "desc" } }],
    include: {
      category: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}
