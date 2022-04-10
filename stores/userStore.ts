import create from "zustand";
import { User, IUserState } from "../common/types";

export const useStore = create<IUserState>((set) => ({
  users: [],
  user_count: 0,
  fetchData: (fetchedUsers: User[], userCount: number) =>
    set((state: any) => ({ users: fetchedUsers, user_count: userCount })),
  addUser: (userData: User) =>
    set((state: any) => ({ users: [userData, ...state.users] })),
  updateUser: (userData: User) => {
    set((state: any) => {
      const userList: User[] = [...state.users];
      const userIndex = userList.findIndex(
        (user: User) => user.id === userData.id
      );
      userList[userIndex] = { ...userData };
      set((state: any) => ({ users: [...userList] }));
    });
  },
  deleteUser: (userID: string) => {
    set((state: any) => {
      const userList: User[] = [...state.users];
      const userIndex = userList.findIndex((user: User) => user.id === userID);
      userList.splice(userIndex, 1);
      set((state: any) => ({ users: [...userList] }));
    });
  },
  currentPage: 1,
  setCurrentPage: (pageNumber: number) =>
    set((state: any) => ({ currentPage: pageNumber })),
}));
