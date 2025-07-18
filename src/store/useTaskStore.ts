// src/stores/task-store.ts
import { createStore } from 'zustand/vanilla';
import { Task } from "@/types/types";
import { isToday, isTomorrow, parseISO, format } from "date-fns";

// Types for state
export type TaskState = {
  tasks: Task[],
  searchQuery: string,
  loading: boolean,
  lastUpdated:string|null,
}

// types of the actions in our store
export type TaskActions = {
  fetchTasks: () => Promise<void>;
  updateTaskStatus: (id: string, status: string) => void;
  setSearchQuery: (query: string) => void;


}

export type TaskStore = TaskState & TaskActions;

// the inital state
const defaultInitState: TaskState = {
  tasks: [],
  searchQuery: "",
  loading: true,
  lastUpdated:null,

};

// Initalize store
export const initTaskStore = (): TaskState => defaultInitState;

// Creation of store must implement all methods in the  taskstore type
export const createTaskStore = (initState: TaskState = defaultInitState) => {

  return createStore<TaskStore>()((set, get) => ({
    ...initState,

    // fetch tasks from api
    fetchTasks: async () => {
      try {
    
        // Check if it exisits in storage if nto fetch it
        const localTasks = localStorage.getItem("tasks");

        if (localTasks) {
          set({ tasks: JSON.parse(localTasks) });
        } else {

          const response = await fetch("/api/tasks");
          const data = await response.json();

          const updatedTasks = data.map((task: Task) => {
            const date = parseISO(task.dueDate);
            let formattedDate;

            if (isToday(date)) {
              formattedDate = "Today";
            } else if (isTomorrow(date)) {
              formattedDate = "Tomorrow";
            } else {
              formattedDate = format(date, "dd MMM yyyy");
            }

            return {
              ...task,
              dueDate: formattedDate,
              updatedAt: new Date().toISOString()
            };
          });

          set({ tasks: updatedTasks });
          localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }finally{
         set({loading:false})
      }
    },

    // Drag and drop update
    updateTaskStatus: (id, status) => {
      const updatedTasks = get().tasks.map(task =>
        task.id === id
          ? { ...task, status, updatedAt: new Date().toISOString() }
          : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      const readableDate = format(new Date(), 'PPpp')

      set({lastUpdated:readableDate})

      set({ tasks: updatedTasks });
    },

    setSearchQuery: (query) => set({ searchQuery: query }),


  }));
};
