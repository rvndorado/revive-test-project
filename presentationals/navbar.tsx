import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const NavigationContainer = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 140px 0 140px;
  box-shadow: 0 3px 2px -2px rgba(0, 0, 0, 0.2);
`;

const LogoutLink = styled.h4`
  cursor: pointer;
`;

const Navbar = () => {
  const { logout } = useAuth();

  const handleLogOut = async () => {
    try {
      await logout();
    } catch  {
      Swal.fire(
        "Something went wrong",
        "A problem has occured while we are tring to log-out your account",
        "error"
      );
    }
  };
  return (
    <>
      <NavigationContainer>
        <div>
          <h3>Revive Test Project</h3>
        </div>
        <div>
          <LogoutLink onClick={handleLogOut}>Logout</LogoutLink>
        </div>
      </NavigationContainer>
    </>
  );
};

export default Navbar;
