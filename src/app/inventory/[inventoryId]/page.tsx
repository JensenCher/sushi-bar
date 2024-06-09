"use client";

import { BreadcrumbSection } from "@/components/ui/BreadcrumbSection";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { DeleteInventoryButton } from "./_components/delete-button";

export default function InventoryPage({
  params,
}: {
  params: {
    inventoryId: Id<"inventories">;
  };
}) {
  const inventory = useQuery(api.inventories.getInventory, {
    inventoryId: params.inventoryId,
  });

  return (
    <main className="container flex flex-col gap-8 p-16">
      {!inventory && (
        <>
          <Skeleton className="h-[20px] w-[160px] rounded-full" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-[3rem] w-[20rem] rounded-full" />
            <Skeleton className="h-[3rem] w-[6rem] rounded-xl" />
          </div>
          <div className="my-4 grid grid-cols-2 gap-8 md:grid-cols-4">
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
        </>
      )}
      {inventory && (
        <>
          <BreadcrumbSection title={inventory.title} />
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">
              Inventory - {inventory.title}
            </h1>
            <DeleteInventoryButton inventoryId={params.inventoryId} />
          </div>
          <div className="my-4 grid grid-cols-2 gap-8 md:grid-cols-4">
            <Image
              src={inventory.inventoryUrl!}
              alt={`${inventory.title} image`}
              width={500}
              height={500}
              quality={75}
              className="p-5"
            />
          </div>
        </>
      )}
    </main>
  );
}
