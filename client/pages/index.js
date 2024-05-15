const LandingPage = ({ color }) => {
  console.log("I am on the component: ", color);
  return <h1>Landing Page</h1>;
};

// to pass initial arguments to the server before rendering component
LandingPage.getInitialProps = () => {
  console.log("I am on the server");
  return { color: "red" };
};

export default LandingPage;
