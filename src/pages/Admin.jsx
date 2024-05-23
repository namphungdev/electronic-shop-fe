import React from "react";
import { useAuth } from "@/hooks/useAuth";


const Admin = () => {
  const { user } = useAuth();

  console.log('user 8', user);
  return (
    <>
      CMS
    </>
  );
};

export default Admin;
