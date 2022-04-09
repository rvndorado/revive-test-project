import { ChangeEvent, FC, useState } from "react";
import { Modal, Button, Image, Header, Input } from "semantic-ui-react";
import Swal from "sweetalert2";
import axios from "axios";
import { IModalProps, User } from "../common/types";
import { validateNewUser } from "../common/validate";
import { useStore } from "../stores/userStore";

const AddUserModal: FC<IModalProps> = ({ open, setOpen }) => {
  const [imageLink, setImageLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { addUser } = useStore();

  const handleAddUser = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    //@ts-ignore
    const email = event.target.email.value;
    //@ts-ignore
    const first_name = event.target.first_name.value;
    //@ts-ignore
    const last_name = event.target.last_name.value;

    try {
      const { error } = validateNewUser(
        email,
        first_name,
        last_name,
        imageLink
      );

      if (error) {
        let errorMessage: string[] = [];
        error.details.forEach((details) => {
          errorMessage.push(details.message);
        });
        Swal.fire("Validation Error", errorMessage.join("\n"), "error");
      } else {
        setLoading(true);
        setTimeout(async () => {
          const createUserResponse = await axios.post("/api/users", {
            email,
            first_name,
            last_name,
            avatar: imageLink,
          });
          console.log(createUserResponse.data.id);
          const newUser: User = {
            id: createUserResponse.data.id,
            email,
            first_name,
            last_name,
            avatar: imageLink,
          };
          addUser(newUser);
          setLoading(false);
          Swal.fire("Success", "User Successfully Added", "success");
          setOpen(false);
        }, 1000);
      }
    } catch (error) {
      Swal.fire(
        "Something went wrong",
        "An error has occured while adding user.",
        "error"
      );
    }
  };

  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button primary>Add User</Button>}
      >
        <Modal.Header>Add User</Modal.Header>
        <Modal.Content image>
          {/* @ts-ignore */}
          <Image
            size="large"
            src={
              imageLink === ""
                ? "https://react.semantic-ui.com/images/wireframe/image.png"
                : imageLink
            }
            alt="User Image"
            wrapped
          />
          <Modal.Description style={{ width: "100%" }}>
            {/* @ts-ignore */}
            <Header>User Detail</Header>
            <form
              id="addUserForm"
              onSubmit={handleAddUser}
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
              }}
            >
              <Input
                type="email"
                name="email"
                placeholder="Email"
                style={{ width: "70%" }}
                required
              />
              <Input
                type="text"
                name="first_name"
                placeholder="First Name"
                style={{ width: "70%" }}
                required
              />
              <Input
                type="text"
                name="last_name"
                placeholder="Last Name"
                style={{ width: "70%" }}
                required
              />
              <Input
                type="text"
                name="image_link"
                placeholder="Image Link"
                style={{ width: "70%" }}
                value={imageLink}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setImageLink(event.target.value)
                }
                required
              />
            </form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            form="addUserForm"
            type="submit"
            loading={loading}
            disabled={loading}
          >
            Add User
          </Button>
          <Button primary onClick={() => setOpen(false)}>
            Close Modal
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default AddUserModal;
