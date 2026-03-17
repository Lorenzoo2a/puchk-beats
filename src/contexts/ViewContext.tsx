import { createContext, useContext, useState, ReactNode } from "react";

export type ViewMode = "buyer" | "seller" | "admin";

interface ViewContextType {
  view: ViewMode;
  setView: (v: ViewMode) => void;
}

const ViewContext = createContext<ViewContextType>({ view: "seller", setView: () => {} });

export const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<ViewMode>("seller");
  return <ViewContext.Provider value={{ view, setView }}>{children}</ViewContext.Provider>;
};

export const useView = () => useContext(ViewContext);
