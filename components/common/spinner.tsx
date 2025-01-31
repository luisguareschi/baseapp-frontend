import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface props {
  className?: string;
}

const Spinner = ({ className }: props) => {
  return <Loader2 className={cn("animate-spin", className)} />;
};

export default Spinner;
