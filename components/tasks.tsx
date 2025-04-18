import { cn } from "@/lib/utils";
import { Wallet, ChevronDown } from "lucide-react";
import Image from "next/image";
import { handjet, ibmPlex, jersey } from "./ui/fonts";
import { useAppContext } from "@/contexts/AppContext";
import CustomButton from "@/components/app/common/CustomButton";
import { CustomButtonType } from "@/lib/types";
import { ConsoleIcon } from "./ui/icons";
import { useEffect, useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { TaskDrawer } from "./app/tasks/TaskDrawer";

const missions = [
  {
    id: 1,
    logo: <ConsoleIcon />,
    name: "Connect Consoles",
    title: "Connect atleast 2 different consoles.",
    points: 200,
    category: "console",
    imgSrc: "/pngs/x-logo.png",
  },
  {
    id: 2,
    logo: <ConsoleIcon />,
    name: "Connect Consoles",
    title: "Connect atleast 2 consoles from same provider.",
    points: 200,
    category: "console",
    imgSrc: "/pngs/x-logo.png",
  },
  {
    id: 3,
    logo: <ConsoleIcon />,
    name: "Connect Consoles",
    title: "Connect all supported Consoles.",
    points: 250,
    category: "console",
    imgSrc: "/pngs/x-logo.png",
  },
  {
    id: 4,
    logo: <ConsoleIcon />,
    name: "Refer ",
    title: "Refer 3 friends.",
    points: 150,
    category: "others",
    imgSrc: "/pngs/x-logo.png",
  },
  {
    id: 5,
    logo: <ConsoleIcon />,
    name: "Refer ",
    title: "Refer 10 friends.",
    points: 250,
    category: "others",
    imgSrc: "/pngs/x-logo.png",
  },
];

export default function Tasks() {
  const { user } = useAppContext();
  const [activeTab, setActiveTab] = useState("console");
  const [filteredMissions, setFilteredMissions] = useState(missions);

  // scroll to top of screen on component load
  useEffect(() => {
    if (window && typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const filteredMissions = missions.filter(
      (mission) => mission.category === activeTab
    );
    setFilteredMissions(filteredMissions);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Heading */}

        <div className=" ">
          <div className="flex justify-around mb-2">
            <span
              className={cn("text-5xl mt-10 text-white ", jersey.className)}
            >
              MISSIONS
            </span>
          </div>

          <div className="flex justify-center ">
            <span
              className={cn(
                "text-white text-sm text-center w-[60%] ",
                ibmPlex.className
              )}
            >
              EARN TOP GAMERS AND CONSO WINNERS UPDATED DAILY
            </span>
          </div>
        </div>

        {/* Tasks Buttons */}
        <div className="mt-4">
          <div className="grid grid-cols-3 gap-3 px-4 justify-center items-center text-center ">
            <div
              className={cn(
                activeTab == "console"
                  ? "bg-[#DE5EA6] text-white "
                  : "bg-white text-black"
              )}
              onClick={() => setActiveTab("console")}
            >
              <span className={cn(jersey.className, "text-xl  tracking-wider")}>
                Console
              </span>
            </div>
            <div
              className={cn(
                activeTab == "social"
                  ? "bg-[#DE5EA6] text-white "
                  : "bg-white text-black"
              )}
              onClick={() => setActiveTab("social")}
            >
              <span className={cn(jersey.className, "text-xl  tracking-wider")}>
                Social
              </span>
            </div>
            <div
              className={cn(
                activeTab == "others"
                  ? "bg-[#DE5EA6] text-white "
                  : "bg-white text-black"
              )}
              onClick={() => setActiveTab("others")}
            >
              <span className={cn(jersey.className, "text-xl  tracking-wider")}>
                Others
              </span>
            </div>
          </div>
        </div>

        {/* Task Cards */}
        <div className="flex flex-col px-4 my-6 gap-3 w-full">
          {filteredMissions.length === 0 ? (
            <div className="flex justify-center items-center h-20">
              <span className={cn(jersey.className, "text-xl text-white")}>
                No missions available
              </span>
            </div>
          ) : (
            filteredMissions.map((mission) => (
              <div className="grid grid-cols-7 justify-center items-center px-2 py-2 bg-[#5C6E7E]">
                <div className="col-span-1 bg-[#1E2E3D] flex items-center justify-center rounded-lg h-10 w-10">
                  {mission.logo}
                </div>
                <span
                  className={cn(
                    jersey.className,
                    "text-lg text-white col-span-4 tracking-wider"
                  )}
                >
                  {mission.title}
                </span>
                {user.completed_missions.includes(mission.id) ? (
                  <CustomButton
                    text={mission.points.toString()}
                    type={CustomButtonType.TASK_COIN_AMOUNT_CREDITED}
                    handleClick={() => console.log("already completed")}
                  ></CustomButton>
                ) : (
                  <Drawer>
                    <DrawerTrigger>
                      <CustomButton
                        text={mission.points.toString()}
                        type={CustomButtonType.TASK_COIN_AMOUNT}
                        handleClick={() => console.log("opening task drawer")}
                      ></CustomButton>
                    </DrawerTrigger>
                    <DrawerContent>
                      <TaskDrawer
                        id={mission.id}
                        logo={mission.imgSrc}
                        name={mission.name}
                        description={mission.title}
                        coinAmount={mission.points}
                      />
                    </DrawerContent>
                  </Drawer>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
