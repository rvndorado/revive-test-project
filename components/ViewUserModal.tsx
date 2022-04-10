import { FC } from "react";
import { Modal, Button, Image, Header, Input } from "semantic-ui-react";
import { ViewModalProps } from "../common/types";

const ViewUserModal: FC<ViewModalProps> = ({ open, setOpen, userDetails, trigger }) => {
  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={trigger}
      >
        <Modal.Header>View User Details</Modal.Header>
        <Modal.Content image>
          {/* @ts-ignore */}
          <Image size="large" src={userDetails.avatar} alt="User Image" />
          <Modal.Description style={{ width: "100%" }}>
            {/* @ts-ignore */}
            <Header>User Detail</Header>
            <p>
              User ID: <strong>{userDetails.id}</strong>
            </p>
            <p>
              Email: <strong>{userDetails.email}</strong>
            </p>
            <p>
              First Name: <strong>{userDetails.first_name}</strong>
            </p>
            <p>
              Last Name: <strong>{userDetails.last_name}</strong>
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpen(false)}>
            Close Modal
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ViewUserModal;
