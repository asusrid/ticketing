import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

// to pass initial arguments to the server before rendering component
// we cannot use here use-request because as a hook, I can only use it
// in a react component, not in a plain function
// there is a request object which is the original req that came from the browser (in the context obj)
LandingPage.getInitialProps = async (context) => {
  // console.log(req.headers);
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

export default LandingPage;
