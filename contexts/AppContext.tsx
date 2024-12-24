import { ConsoUser } from "@/lib/types";
import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

// Define the type for the context state
interface AppState {
  pointBalance: number;
  message: string;
}

// Define the type for the context value (state + setters)
interface AppContextType {
  // state: AppState;
  pointBalance: number;
  user: ConsoUser;
  startPointBalance: number;
  message: string;
  setUserData: Dispatch<SetStateAction<ConsoUser>>;
  setPointBalance: Dispatch<SetStateAction<number>>;
  setStartPointBalance: Dispatch<SetStateAction<number>>;
  setMessage: Dispatch<SetStateAction<string>>;
}

// Create the context with an undefined default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create the provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [pointBalance, setPointBalance] = useState<number>(0);
  const [startPointBalance, setStartPointBalance] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [user, setUserData] = useState<ConsoUser>({
    id: "",
    nickname: "",
    username: "",
    degen_score: 0,
    current_boost: 0,
    user_points: 0,
    connected_consoles: {},
    created_at: "",
    completed_missions: [],
  });

  // const state: AppState = { pointBalance, message };

  return (
    <AppContext.Provider
      value={{
        pointBalance,
        startPointBalance,
        message,
        user,
        setUserData,
        setPointBalance,
        setStartPointBalance,
        setMessage,
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
