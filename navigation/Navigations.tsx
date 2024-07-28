import React, { useContext } from "react";

import BottomTabNavigation from "../navigation/BottomTabNavigation";
import AuthStackNavigation from "../navigation/AuthStackNavigation";
import { AuthContext } from "../context/AuthContex";

const Navigations = () => {
  const ctxAuth = useContext(AuthContext);
  return <>{ctxAuth.isUserActive ? <BottomTabNavigation /> : <AuthStackNavigation />}</>;
};

export default Navigations;
