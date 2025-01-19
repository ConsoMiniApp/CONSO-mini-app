import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { handjet, ibmPlex500, ibmPlex700, jersey } from "@/components/ui/fonts";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowRightIcon,
  Boost,
  Close,
  ConsoleIcon,
} from "@/components/ui/icons";

export function InfoDialog() {
  const activities = [
    { name: "PlayStation", rate: "2.5x" },
    { name: "Xbox", rate: "2.5x" },
    { name: "Bitboy", rate: "2.0x" },
    { name: "Sui Console", rate: "2.0x" },
    { name: "Nintendo", rate: "1.75x" },
    { name: "Steam", rate: "1.5x" },
  ];
  return (
    <>
      <div className="overflow-y-scroll scrollbar-none  bg-white p-4 rounded-xl mt-12">
        {/* Top Section */}
        <div className="flex justify-between">
          <p
            className={cn(
              handjet.className,
              "text-xl text-[#7C7C7C] tracking-wider"
            )}
          >
            {" "}
            CONSO REWARD SYSTEM
          </p>
          <DialogClose>
            <a>
              <Close />
            </a>
          </DialogClose>
        </div>

        {/* Sub Heading */}
        <div className="flex flex-col space-y-4 text-black mt-2 mr-2 ">
          <p className={cn(ibmPlex500.className, "text-xs tracking-tight")}>
            {" "}
            Earn CONSO tokens by contributing to the network in various ways.
            Check out the mining rates based on your engagement level:
          </p>

          <div className="ml-1">
            {/* Console Info */}
            <div>
              <p
                className={cn(
                  ibmPlex700.className,
                  "text-xs tracking-tight flex items-center justify-left gap-2"
                )}
              >
                {" "}
                <div className="flex justify-center items-center">
                  <ConsoleIcon />
                </div>
                <p
                  className={cn(
                    jersey.className,
                    "text-[#DE5EA6] text-xl tracking-wider"
                  )}
                >
                  CONSOLES:
                  <span
                    className={cn(
                      jersey.className,
                      "text-[#A08F00] text-xl tracking-wider"
                    )}
                  >
                    {" "}
                    The Data Providers
                  </span>
                </p>
              </p>
              <p
                className={cn(
                  ibmPlex500.className,
                  "text-xs tracking-tight mt-1 flex gap-2 items-start"
                )}
              >
                <div>
                  <ArrowRightIcon />
                </div>
                <p>
                  Connected consoles act as data providers, boosting mining
                  rates and enriching the ecosystem.
                </p>
              </p>
              {/* Table with info */}
              <div className={cn("w-[90%]  mt-4 ml-4 ", ibmPlex500.className)}>
                <Table>
                  <TableHeader className="bg-[#E7E8E3] ">
                    <TableRow>
                      <TableHead className="text-xs text-black">
                        Activity
                      </TableHead>
                      <TableHead className="text-xs text-black">
                        Mining Rate
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activities.map((activity) => (
                      <TableRow key={activity.name}>
                        <TableCell className="text-xs text-gray-600">
                          {activity.name}
                        </TableCell>
                        <TableCell className="text-gray-600 text-xs">
                          {activity.rate}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="mt-3">
              <p
                className={cn(
                  ibmPlex700.className,
                  "text-xs tracking-tight flex items-center justify-left gap-2 "
                )}
              >
                {" "}
                <div className="flex justify-center items-center">
                  {" "}
                  <Boost />
                </div>
                <p
                  className={cn(
                    jersey.className,
                    "text-[#DE5EA6] text-xl tracking-wider"
                  )}
                >
                  ACTIVE ENGAGEMENT:
                  <span
                    className={cn(
                      jersey.className,
                      "text-[#A08F00] text-xl tracking-wider"
                    )}
                  >
                    {" "}
                    Mini App Users
                  </span>
                </p>
              </p>
              <p
                className={cn(
                  ibmPlex500.className,
                  "text-xs tracking-tight mt-1 flex items-start gap-2"
                )}
              >
                <div>
                  <ArrowRightIcon />
                </div>
                <p>
                  Earn extra by contributing through gaming, tapping, and
                  watching ads.
                </p>
              </p>
              {/* Table with info */}
              <div className={cn("w-[90%]  mt-4 ml-4 ", ibmPlex500.className)}>
                <Table>
                  <TableHeader className="bg-[#E7E8E3] ">
                    <TableRow>
                      <TableHead className="text-xs text-black">
                        Activity
                      </TableHead>
                      <TableHead className="text-xs text-black">
                        Mining Rate
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activities.map((activity) => (
                      <TableRow key={activity.name}>
                        <TableCell className="text-xs text-gray-600">
                          {activity.name}
                        </TableCell>
                        <TableCell className="text-gray-600 text-xs">
                          {activity.rate}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
