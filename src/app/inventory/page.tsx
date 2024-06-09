"use client";

import { AuthLoading, Authenticated, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import CreateInventoryButton from "./_components/create-inventory-button";
import InventoryCard from "./_components/inventory-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const inventories = useQuery(api.inventories.getInventories);
  return (
    <main className="container flex flex-col gap-8 p-16">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Inventories</h1>
        <Authenticated>
          <CreateInventoryButton />
        </Authenticated>
        <AuthLoading>
          <Skeleton className="h-10 w-[10.5rem] rounded-md" />
        </AuthLoading>
      </div>
      <div className="my-4 grid grid-cols-2 gap-8 md:grid-cols-4">
        {!inventories &&
          Array.from({ length: 10 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-7 w-20 rounded-full" />
                </CardTitle>
                <Skeleton className="h-4 w-40 rounded-full" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full rounded-full" />
                  <Skeleton className="h-4 w-full rounded-full" />
                  <Skeleton className="h-4 w-full rounded-full" />
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-center">
                <Skeleton className="h-10 w-20 rounded-md" />
              </CardFooter>
            </Card>
          ))}
        {inventories &&
          inventories?.map((inv) => (
            <InventoryCard key={inv._id} inventory={inv} />
          ))}
      </div>
    </main>
  );
}
