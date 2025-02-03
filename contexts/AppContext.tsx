"use client";
import { ConsoUser } from "@/lib/types";
import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

// Define the type for the context value (state + setters)
interface AppContextType {
  // state: AppState;
  navigationBarHidden: boolean;
  user: ConsoUser;
  startPointBalance: number;
  telegramUsername: string;
  referralCode: string;
  setUserData: Dispatch<SetStateAction<ConsoUser>>;
  setNavigationBarHidden: Dispatch<SetStateAction<boolean>>;
  setStartPointBalance: Dispatch<SetStateAction<number>>;
  setTelegramUsername: Dispatch<SetStateAction<string>>;
  setReferralCode: Dispatch<SetStateAction<string>>;
}

// Create the context with an undefined default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create the provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [startPointBalance, setStartPointBalance] = useState<number>(0);
  const [telegramUsername, setTelegramUsername] = useState<string>("");
  const [referralCode, setReferralCode] = useState<string>("");
  const [navigationBarHidden, setNavigationBarHidden] =
    useState<boolean>(false);
  const [user, setUserData] = useState<ConsoUser>({
    id: "",
    username: "",
    nickname: "",
    degen_score: 0,
    current_boost: 0,
    user_points: 0,
    created_at: "",
    completed_missions: [],
    connected_consoles: {
      playstation: [],
      xbox: [],
      steam: [],
      nintendo: [],
      bitboy: [],
      sui: [],
    },
    global_rank: 0,
    game_high_score: 0,
    game_total_distance: 0,
    completed_conso_game_missions: [],
    show_conso_game_mission_notif: false,
    unclaimed_mystery_boxes: [],
    claimed_mystery_boxes: [],
    game_assets: {
      potions: 0,
      characters: [],
      jetpacks: [],
    },
    referral_code: "",
  });

  return (
    <AppContext.Provider
      value={{
        navigationBarHidden,
        startPointBalance,
        telegramUsername,
        referralCode,
        user,
        setUserData,
        setNavigationBarHidden,
        setStartPointBalance,
        setTelegramUsername,
        setReferralCode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
