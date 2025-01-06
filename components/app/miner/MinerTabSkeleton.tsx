import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown } from "lucide-react";

export function MinerTabSkeleton() {
  return (
    <div className="min-h-screen bg-[#5C6E7E]">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Top Status Card */}
        <div className="p-2 rounded-3xl m-4 ">
          <Skeleton className="h-[335px] rounded-3xl bg-white/20" />
        </div>

        {/* Tap and Ads Section */}
        <div className="space-y-4 px-4 mb-4">
          <div className="grid grid-cols-3 gap-1">
            <div className="flex items-center justify-center">
              <Skeleton className="h-24 w-24 rounded-full bg-white/20" />
            </div>
            <div className="flex flex-col gap-3 items-center justify-center">
              <div className="flex gap-4">
                <Skeleton className="h-8 w-8 rounded-md bg-white/20" />
                <Skeleton className="h-8 w-8 rounded-md bg-white/20" />
              </div>
              <Skeleton className="h-8 w-16 bg-white/20" />
            </div>
            <div className="flex items-center justify-center">
              <Skeleton className="h-24 w-24 rounded-full bg-white/20" />
            </div>
          </div>
        </div>

        {/* Connect Section */}
        <div className="flex flex-col">
          <hr className="w-full border-[#C9C9C9] mb-2" />
          <div className="space-y-4 px-6">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-32 bg-white/20" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-16 bg-yellow-400/20" />
                <ChevronDown className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </div>
          <hr className="w-full border-[#C9C9C9] mt-2 mb-3" />

          {/* Gaming Platforms */}
          <div className="space-y-4 px-6 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded bg-white/20" />
                  <Skeleton className="h-6 w-24 bg-white/20" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-12 bg-white/20" />
                  <Skeleton className="h-8 w-20 rounded-full bg-white/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
