"use client";

import * as actions from "@/actions";
import { Input } from "@heroui/react";
import { useSearchParams } from "next/navigation";

export default function SearchInput() {
  const searchParams = useSearchParams();
  return (
    <form action={actions.search}>
      <Input
        name="term"
        defaultValue={searchParams.get("term") || ""}
        type="search"
        placeholder="Search..."
        className="w-64"
        aria-label="Search"
      />
    </form>
  );
}
