import { ReactNode } from "react";
import { IconType } from "react-icons";


// Tasks array and single task
export interface Task {
  id: string;
  category:string,
  title: string;
  dueDate: string;
  priority: string;
  comments?: number;
  collaborators?:number
  links?:number,
  thumbnail?:string,
  status: string;
  reports?:number;
  notificationType?:string;
  updatedAt:string;
}


// Links in side bar
export interface MenuItem {
  label: string;
  icon: ReactNode | IconType;
  badge?: number;
  path:string;
  active?: boolean;
  subItems?: { label: string; active?: boolean , icon: ReactNode | IconType}[];
}

// TaskState type for the store
export interface TaskState  {
  tasks: Task[];
  searchQuery: string;
}
