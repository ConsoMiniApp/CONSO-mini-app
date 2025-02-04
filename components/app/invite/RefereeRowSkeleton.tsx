import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface TableSkeletonProps {
  rows?: number;
}

export function RefereeRowSkeleton({ rows = 3 }: TableSkeletonProps) {
  return (
    <div className="flex flex-col">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "grid grid-cols-8 justify-center items-center px-4 h-[32px]",
            index % 2 !== 0 ? "bg-[#5C6E7E]" : "bg-black"
          )}
        >
          {/* ID Column */}
          <div className="col-span-1">
            <Skeleton className="h-4 w-8 bg-white/20" />
          </div>

          {/* Nickname Column */}
          <div className="col-span-3">
            <Skeleton className="h-4 w-24 bg-white/20" />
          </div>

          {/* Distance Column */}
          <div className="col-span-2 flex justify-center">
            <Skeleton className="h-4 w-16 bg-white/20" />
          </div>

          {/* Points Column */}
          <div className="col-span-2 flex justify-center">
            <Skeleton className="h-4 w-12 bg-[#E8BA00]/20" />
          </div>
        </div>
      ))}
    </div>
  );
}
