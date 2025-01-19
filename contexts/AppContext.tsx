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
  pointBalance: number;
  navigationBarHidden: boolean;
  user: ConsoUser;
  startPointBalance: number;
  telegramUsername: string;
  setUserData: Dispatch<SetStateAction<ConsoUser>>;
  setNavigationBarHidden: Dispatch<SetStateAction<boolean>>;
  setPointBalance: Dispatch<SetStateAction<number>>;
  setStartPointBalance: Dispatch<SetStateAction<number>>;
  setTelegramUsername: Dispatch<SetStateAction<string>>;
}

// Create the context with an undefined default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create the provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [pointBalance, setPointBalance] = useState<number>(0);
  const [startPointBalance, setStartPointBalance] = useState<number>(0);
  const [telegramUsername, setTelegramUsername] = useState<string>("");
  const [navigationBarHidden, setNavigationBarHidden] =
    useState<boolean>(false);
  const [user, setUserData] = useState<ConsoUser>({
    id: "",
    nickname: "",
    username: "",
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
    game_total_distance: 0,
  });

  // const state: AppState = { pointBalance, message };

  return (
    <AppContext.Provider
      value={{
        pointBalance,
        navigationBarHidden,
        startPointBalance,
        telegramUsername,
        user,
        setUserData,
        setNavigationBarHidden,
        setPointBalance,
        setStartPointBalance,
        setTelegramUsername,
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
