import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";
import { btnIconStyles, btnStyles } from "@/styles/styles";

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
        <CardFooter className={btnStyles}>
          <Button asChild className={btnStyles} variant={"secondary"}>
            <Link href={`/inventory/${inventory._id}`}>
              <Eye className={btnIconStyles} /> View
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InventoryCard;
