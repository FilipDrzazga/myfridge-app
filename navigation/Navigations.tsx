import React, { useContext } from "react";

import BottomTabNavigation from "../navigation/BottomTabNavigation";
import AuthStackNavigation from "../navigation/AuthStackNavigation";
import { AuthContext } from "../context/AuthContex";

const Navigations = () => {
  const ctx = useContext(AuthContext);
  return <>{ctx.isUserLogin ? <BottomTabNavigation /> : <AuthStackNavigation />}</>;
};

export default Navigations;
