export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface IUserState {
  users: User[];
  fetchData: (data: User[]) => void;
  addUser: (userData: User) => void;
}

export interface IModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
