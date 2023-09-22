"use client";

// https://github.com/sindresorhus/query-string#readme
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import { cn } from "@/utils/utils";

type CategoryBoxProps = {
  icon: IconType;
  label: string;
  selected?: boolean;
};
const CategoryBox = ({ icon: Icon, label, selected }: CategoryBoxProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    // current query params
    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    // update category in query
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    // delete category if already selected
    if (searchParams.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, router, searchParams]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer",
        selected ? "border-b-neutral-800" : "border-transparent",
        selected ? "text-neutral-800" : "text-neutral-500"
      )}
    >
      <Icon size={26} />
      <div className="font-medium text-center">{label}</div>
    </div>
  );
};
export default CategoryBox;
