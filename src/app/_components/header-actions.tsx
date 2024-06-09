"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
export function HeaderActions() {
  return (
    <>
      <Unauthenticated>
        <SignInButton>
          <Button variant={"outline"}>Sign In</Button>
        </SignInButton>
      </Unauthenticated>
      <Authenticated>
        <UserButton />
      </Authenticated>
      <AuthLoading>
        <Skeleton className="h-8 w-8 rounded-full" />
      </AuthLoading>
    </>
  );
}
