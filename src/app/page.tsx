"use client";

import { Authenticated, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import CreateInventoryButton from "./_components/create-inventory-button";
import InventoryCard from "./_components/inventory-card";

export default function Home() {
  const inventories = useQuery(api.inventories.getInventories);
  return (
    <main className="container flex flex-col gap-8 p-16">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Inventories</h1>
        <Authenticated>
          <CreateInventoryButton />
        </Authenticated>
      </div>
      <div className="my-4 grid grid-cols-2 gap-8 md:grid-cols-4">
        {inventories?.map((inv) => (
          <InventoryCard key={inv._id} inventory={inv} />
        ))}
      </div>
    </main>
  );
}
