import { ReactNode } from "react";
import { IconType } from "react-icons";


// Links in side bar
export interface MenuItem {
  label: string;
  icon: ReactNode | IconType;
  badge?: number;
  path:string;
  active?: boolean;
  subItems?: { label: string; active?: boolean , icon: ReactNode | IconType}[];
}
