import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1.load the authonticated users

  const { isLoading, isAuthenticated } = useUser();

  //2.if there is no authinticated user, redirect to login page

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  //3.showing spinner while loading
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //4. if there is authinticated user render the app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
