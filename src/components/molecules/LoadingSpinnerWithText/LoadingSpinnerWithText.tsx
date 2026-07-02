import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

function LoadingSpinnerWithText() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Button disabled size="lg" className="text-xl">
        <Spinner data-icon="inline-start" className="size-6" />
        Loading...
      </Button>
    </div>
  );
}

export default LoadingSpinnerWithText;
