"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ButtonPage from "../components/button";

function Button() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  return <ButtonPage id={id} />;
}

export default function HomePage() {
  return (
    <Suspense>
      <Button />
    </Suspense>
  );
}
