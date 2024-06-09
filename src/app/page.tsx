"use client";

import { Authenticated, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { btnIconStyles, btnStyles } from "@/styles/styles";

export default function Home() {
  const inventories = useQuery(api.inventories.getInventories);
  return (
    <main className="container flex flex-col gap-8 p-16">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Landing Page</h1>
        <Authenticated>
          <Button>
            <Link href={"/inventory"} className={btnStyles}>
              Go to Inventories <MoveRight className={btnIconStyles} />
            </Link>
          </Button>
        </Authenticated>
      </div>
    </main>
  );
}
