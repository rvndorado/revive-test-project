import create from "zustand";
import { User, IUserState } from "../common/types";

export const useStore = create<IUserState>((set) => ({
  users: [],
  fetchData: (fetchedUsers: User[]) =>
    set((state: any) => ({ users: fetchedUsers })),
  addUser: (userData: User) =>
    set((state: any) => ({ users: [userData, ...state.users] })),
}));
