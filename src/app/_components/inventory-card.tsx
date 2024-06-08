import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc } from "../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";

const InventoryCard = ({ inventory }: { inventory: Doc<"inventories"> }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{inventory.title}</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter className="flex flex-col items-end gap-2">
          <Button className="px-6" size={"sm"} variant={"secondary"}>
            View
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InventoryCard;
