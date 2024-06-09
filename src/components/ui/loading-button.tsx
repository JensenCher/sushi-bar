import { Loader2 } from "lucide-react";
import { Button } from "./button";
import { MouseEvent, ReactNode } from "react";

export function LoadingButton({
  isLoading,
  loadingText,
  children,
  onClick,
}: {
  isLoading: boolean;
  loadingText: string;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}) {
  return (
    <Button
      type="submit"
      className="flex items-center justify-center gap-2"
      disabled={isLoading}
      onClick={(e) => {
        onClick?.(e);
      }}
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
