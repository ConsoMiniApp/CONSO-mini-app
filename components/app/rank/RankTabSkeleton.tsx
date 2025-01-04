import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface TableSkeletonProps {
  rows?: number;
}

export function RankTabSkeleton({ rows = 20 }: TableSkeletonProps) {
  return (
    <div className="flex flex-col">
      {/* User Stats Row */}
      <div
        className={cn(
          "grid grid-cols-9 justify-center items-center px-4 h-[32px]",
          "bg-[#5C6E7E]"
        )}
      >
        {/* ID Column */}
        <div className="col-span-1">
          <Skeleton className="h-4 w-8 bg-white/20" />
        </div>

        {/* Nickname Column */}
        <div className="col-span-3">
          <Skeleton className="h-4 w-32 bg-white/20" />
        </div>

        {/* Distance Column */}
        <div className="col-span-3 flex justify-center">
          <Skeleton className="h-4 w-20 bg-white/20" />
        </div>

        {/* Points Column */}
        <div className="col-span-2 flex justify-center">
          <Skeleton className="h-4 w-16 bg-[#E8BA00]/20" />
        </div>
      </div>

      {/* Expanded View */}
      <div
        className={cn(
          "grid grid-cols-8 justify-center items-center w-full px-4 h-[58px]",
          "bg-[#5C6E7E]"
        )}
      >
        <div className="col-span-1" />
        <div className="col-span-7 h-[49px] bg-white rounded-md mb-2 py-1 px-4">
          <div className="grid grid-cols-2">
            <Skeleton className="h-3 w-24 bg-gray-200" />
            <Skeleton className="h-3 w-20 bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 mt-2">
            <Skeleton className="h-4 w-16 bg-gray-300" />
            <div className="flex gap-1">
              <Skeleton className="h-5 w-5 rounded-sm bg-gray-200" />
              <Skeleton className="h-5 w-5 rounded-sm bg-gray-200" />
              <Skeleton className="h-5 w-5 rounded-sm bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
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
