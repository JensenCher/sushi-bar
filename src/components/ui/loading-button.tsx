import { Loader2 } from "lucide-react";
import { Button } from "./button";
import { ReactNode } from "react";

export function LoadingButton({
  isLoading,
  loadingText,
  children,
}: {
  isLoading: boolean;
  loadingText: string;
  children: ReactNode;
}) {
  return (
    <Button
      type="submit"
      className="flex items-center justify-center gap-2"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className={"animate-spin"} />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
