import { useState } from "react";
import { Table, Button } from "semantic-ui-react";
import Swal from "sweetalert2";
import axios from "axios";
import { useStore } from "../stores/userStore";
import { User } from "../common/types";
import AddUserModal from "./AddUserModal";
import ViewUserModal from "./ViewUserModal";
import EditUserModal from "./EditUserModal";

const UserTable = () => {
  const { users, deleteUser, currentPage, fetchData } = useStore();
  const [open, setOpen] = useState<boolean>(false);
  const [openViewModal, setOpenViewModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [viewUserDetails, setViewUserDetails] = useState<User>({
    id: "0",
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  });
  const [editUserDetails, setEditUserDetails] = useState<User>({
    id: "0",
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  });

  const handleDelete = (userDetails: User) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert user details deletion of ${userDetails.first_name} ${userDetails.last_name}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete("/api/users", { data: { id: userDetails.id } });
          deleteUser(userDetails.id);
          const fetchResponse = await axios.get("/api/users", {
            params: { page: currentPage },
          });
          const fetchedUsers: User[] = fetchResponse.data.users;
          const userCount: number = fetchResponse.data.totalCount.count;
          fetchData(fetchedUsers, userCount);
          Swal.fire("Deleted!", "User details has been deleted.", "success");
        } catch (error) {
          Swal.fire(
            "Something went wrong",
            "An error has occured while adding user.",
            "error"
          );
        }
      }
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <AddUserModal open={open} setOpen={setOpen} />
      </div>
      {/* @ts-ignore */}
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user: User) => {
            return (
              <Table.Row key={user.id}>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.first_name}</Table.Cell>
                <Table.Cell>{user.last_name}</Table.Cell>
                <Table.Cell collapsing>
                  <>
                    <ViewUserModal
                      open={openViewModal}
                      setOpen={setOpenViewModal}
                      userDetails={viewUserDetails}
                      trigger={
                        <Button
                          color="twitter"
                          onClick={() => setViewUserDetails(user)}
                        >
                          View
                        </Button>
                      }
                    />
                    <EditUserModal
                      open={openEditModal}
                      setOpen={setOpenEditModal}
                      userDetails={editUserDetails}
                      trigger={
                        <Button
                          color="teal"
                          onClick={() => setEditUserDetails(user)}
                        >
                          Edit
                        </Button>
                      }
                    />
                    <Button color="red" onClick={() => handleDelete(user)}>
                      Delete
                    </Button>
                  </>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

export default UserTable;
