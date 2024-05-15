import axios from "axios";

const LandingPage = ({ color }) => {
  console.log("I am on the component: ", color);
  return <h1>Landing Page</h1>;
};

// to pass initial arguments to the server before rendering component
// we cannot use here use-request because as a hook, I can only use it
// in a react component, not in a plain function
LandingPage.getInitialProps = () => {
  console.log("I am on the server");
  return { color: "red" };
};

export default LandingPage;
