import { Skeleton } from "@/components/ui/skeleton";

export default function ConnectDialogSkeleton() {
  return (
    <div className="space-y-4">
      {/* Top Console Card */}

      <Skeleton className="h-[352px] w-full rounded-3xl shadow-lg bg-black/20 " />

      {/* Instructions Card */}

      <Skeleton className="h-[289px] w-full rounded-3xl shadow-lg bg-white/20" />
    </div>
  );
}
