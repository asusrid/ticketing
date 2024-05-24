import useRequest from "../../hooks/use-request";
import { useEffect } from "react";
import Router from "next/router";

const signOut = () => {
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing out...</div>;
};

export default signOut;
