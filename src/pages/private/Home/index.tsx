import React, { useEffect, useState } from "react";
import { useAuth } from "../../../providers/Auth";
import { UserType } from "../../../utils/enums";

import { Container, ContainerMessage } from "./styles";

const Home: React.FC = () => {
  const { hasZones, userTypeIs } = useAuth(); 

  const [errorEmptyZone, setErrorEmptyZone] = useState(false);

  useEffect(() => {
    let didCancel = false;

    if (!didCancel && userTypeIs([UserType.Franchisee, UserType.Clerk]) && !hasZones()) {
      setErrorEmptyZone(true);
    }

    return () => {
      didCancel = true;
    }
  }, [hasZones, setErrorEmptyZone, userTypeIs])
  
  return (
    <Container>
      <ContainerMessage>
        <h1>
          {errorEmptyZone ? `Por favor, entre em contato com a franqueadora!` : `Em breve teremos o "Dashboard"`}
        </h1>
      </ContainerMessage>
    </Container>
  );
};

export default Home;
