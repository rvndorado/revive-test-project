import { useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { useStore } from "../stores/userStore";
import { User } from "../common/types";
import AddUserModal from "./AddUserModal";

const UserTable = () => {
  const { users } = useStore();
  const [open, setOpen] = useState<boolean>(false);

  const handleView = (id: string) => alert(id);

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
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
                    <Button primary onClick={() => handleView(user.id)}>
                      View
                    </Button>
                    <Button primary>Edit</Button>
                    <Button primary>Delete</Button>
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
