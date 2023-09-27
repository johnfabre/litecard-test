"use client";

import { useRouter } from "next/navigation";
import { LcButton } from "../dom/LcButton";
import { LcInput } from "../dom/LcInput";
import { LcCartButton } from "./LcCartButton";

export function LcHeader() {
  const router = useRouter();

  return (
    <header className="p-4 flex justify-between items-center">
      <div className="text-lg font-bold">
        <a href="/" className="no-underline">
          Litecard Mall
        </a>
      </div>
      <div className="flex items-center w-3/5 gap-2">
        <div className="flex-grow">
          <LcInput className="flex-grow" type="text" placeholder="Search..." />
        </div>

        <LcCartButton onClick={() => router.push("/cart")} />
        <LcButton
          icon="fa fa-user"
          onClick={() => router.push("/user")}
        ></LcButton>
      </div>
    </header>
  );
}
