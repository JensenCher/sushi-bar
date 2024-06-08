"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import CreateInventoryForm from "./create-inventory-form";
import { useState } from "react";

export default function CreateInventoryButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create Inventory</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Inventory</DialogTitle>
          <DialogDescription>
            Create an inventory for a section of your restaurant.
          </DialogDescription>
          <CreateInventoryForm
            onCreate={() => {
              setIsOpen(false);
            }}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
