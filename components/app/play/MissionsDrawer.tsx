import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { handjet, ibmPlex500, ibmPlex700, jersey } from "@/components/ui/fonts";
import { cn } from "@/lib/utils";
import { ConsoleIcon } from "@/components/ui/icons";
import CustomButton from "../common/CustomButton";
import { CustomButtonType } from "@/lib/types";

const missions = [
  {
    logo: <ConsoleIcon />,
    title: "Run 2000m in one game.",
    points: 250,
    completed: true,
  },
  {
    logo: <ConsoleIcon />,
    title: "Collect 3 mystery boxes.",
    points: 250,
    completed: false,
  },
  {
    logo: <ConsoleIcon />,
    title: "Collect all skins.",
    points: 250,
    completed: false,
  },
  {
    logo: <ConsoleIcon />,
    title: "Collect all jetpacks.",
    points: 250,
    completed: false,
  },
];

export function MissionsDrawer() {
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
      <div className="overflow-y-scroll scrollbar-none p-4 ">
        {/* Top Section */}
        <div className="flex justify-between px-2">
          <p
            className={cn(
              handjet.className,
              "text-xl text-black tracking-wider"
            )}
          >
            {" "}
            GAME MISSIONS
          </p>
          {/* <DialogClose>
            <a>
              <Close />
            </a>
          </DialogClose> */}
        </div>

        {/* Sub Heading */}
        <div className="flex flex-col space-y-4 text-black mt-2 mr-2 px-2">
          <p className={cn(ibmPlex500.className, "text-xs tracking-tight")}>
            {" "}
            Earn CONSO tokens by contributing to the network in various ways.
            Check out the mining rates based on your engagement level:
          </p>

          {/* Task Cards */}
          <div className="flex flex-col my-6 gap-3 w-full">
            {missions.map((mission) => (
              <div
                className={cn(
                  "grid grid-cols-7 justify-center items-center px-4 py-2 border-2 border-[#FFE500] rounded-xl",
                  mission.completed ? "bg-[#FFE500]" : "bg-white"
                )}
              >
                <div className="col-span-1 bg-[#DE5EA6] flex items-center justify-center rounded-lg h-10 w-10 ">
                  {mission.logo}
                </div>
                <span
                  className={cn(
                    jersey.className,
                    "text-md text-black col-span-4 tracking-wider ml-2"
                  )}
                >
                  {mission.title}
                </span>
                <CustomButton
                  text={mission.points.toString()}
                  type={
                    mission.completed
                      ? CustomButtonType.TASK_COIN_AMOUNT_CREDITED
                      : CustomButtonType.TASK_COIN_AMOUNT
                  }
                  handleClick={() => console.log("do nothing")}
                ></CustomButton>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
