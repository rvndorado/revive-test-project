import { ChangeEvent, FC, useEffect, useState } from "react";
import { Modal, Button, Image, Header, Input } from "semantic-ui-react";
import axios from "axios";
import Swal from "sweetalert2";
import { ViewModalProps, User } from "../common/types";
import { validateExistingUser } from "../common/validate";
import { useStore } from "../stores/userStore";

const EditUserModal: FC<ViewModalProps> = ({
  open,
  setOpen,
  userDetails,
  trigger,
}) => {
  const [imageLink, setImageLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const { updateUser } = useStore();

  useEffect(() => {
    if (open) {
      setImageLink(userDetails.avatar);
      setEmail(userDetails.email);
      setFirstName(userDetails.first_name);
      setLastName(userDetails.last_name);
    }
  }, [open]);

  const handleEdit = () => {
    try {
      const { error } = validateExistingUser(
        userDetails.id,
        email,
        firstName,
        lastName,
        imageLink
      );
      if (error) {
        let errorMessage: string[] = [];
        error.details.forEach((details) => {
          errorMessage.push(details.message);
        });
        Swal.fire("Validation Error", errorMessage.join(" , "), "error");
      } else {
        setLoading(true);
        setTimeout(async () => {
          const updatedUserDetails: User = {
            id: userDetails.id,
            email,
            first_name: firstName,
            last_name: lastName,
            avatar: imageLink,
          };
          await axios.patch("/api/users", updatedUserDetails);
          updateUser(updatedUserDetails);
          setLoading(false);
          Swal.fire("Success", "User Details Successfully Updated", "success");
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
        trigger={trigger}
      >
        <Modal.Header>Edit User</Modal.Header>
        <Modal.Content image>
          {/* @ts-ignore */}
          <Image size="large" src={imageLink} alt="User Image" />
          <Modal.Description style={{ width: "100%" }}>
            {/* @ts-ignore */}
            <Header>User Detail</Header>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
              }}
            >
              <Input
                type="email"
                placeholder="Email"
                label="Email"
                style={{ width: "70%" }}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Input
                type="text"
                name="first_name"
                placeholder="First Name"
                label="First Name"
                style={{ width: "70%" }}
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
              <Input
                type="text"
                name="last_name"
                placeholder="Last Name"
                label="Last Name"
                style={{ width: "70%" }}
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
              <Input
                type="text"
                name="avatar"
                placeholder="Avatar"
                label="Avatar"
                style={{ width: "70%" }}
                required
                value={imageLink}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setImageLink(event.target.value)
                }
              />
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            loading={loading}
            disabled={loading}
            onClick={handleEdit}
          >
            Update User Details
          </Button>
          <Button color="red" onClick={() => setOpen(false)}>
            Close Modal
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default EditUserModal;
