"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const createInventory = useMutation(api.inventories.createInventory);
  const inventories = useQuery(api.inventories.getInventories);
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      Hi
      <div>
        <Unauthenticated>
          <SignInButton />
        </Unauthenticated>
        <Authenticated>
          <UserButton />
          <button
            onClick={() => {
              createInventory({ title: "hello CHicken" });
            }}
          >
            Click Me
          </button>
        </Authenticated>
      </div>
      <div>
        {inventories?.map((inv) => <div key={inv._id}>{inv.title}</div>)}
      </div>
    </main>
  );
}
