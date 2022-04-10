import { ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface IUserState {
  users: User[];
  user_count: number;
  fetchData: (data: User[], count: number) => void;
  addUser: (userData: User) => void;
  updateUser: (userData: User) => void;
  deleteUser: (userID: string) => void;
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
}

export interface IModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ViewModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userDetails: User;
  trigger: ReactNode;
}