import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log("I am on the component: ", currentUser);
  return <h1>Landing Page</h1>;
};

// to pass initial arguments to the server before rendering component
// we cannot use here use-request because as a hook, I can only use it
// in a react component, not in a plain function
// there is a request object which is the original req that came from the browser
LandingPage.getInitialProps = async ({ req }) => {
  // console.log(req.headers);
  if (typeof window === "undefined") {
    // window only exists in browser, so this server
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: req.headers,
      }
    );
    return data;
  } else {
    // this is client
    const { data } = await axios.get("/api/users/currentuser");
    return data;
  }
  console.log("I am on the server");
  return { color: "red" };
};

export default LandingPage;
