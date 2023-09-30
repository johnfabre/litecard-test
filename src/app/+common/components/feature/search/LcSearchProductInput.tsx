"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ROUTES } from "../../../Routes";
import { Hooks } from "../../../utils/hooks";
import { LcInput } from "../../ui/dom/LcInput";

export function LcSearchProductInput() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(query);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      doSearch((event.target as HTMLInputElement).value);
    }
  };

  const doSearch = (q: string) => {
    router.push(ROUTES.searchResult + `?q=${encodeURIComponent(q)}`);
  };

  Hooks.useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  return (
    <LcInput
      className="flex-grow"
      type="text"
      placeholder="Search..."
      buttonIcon="fa fa-search"
      value={searchQuery}
      onKeyDown={handleKeyDown}
      onChange={setSearchQuery}
    />
  );
}
