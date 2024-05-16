import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    // we are on server
    // this is the way of modifying the preconfigured version of axios
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // we are on client
    return axios.create({
      baseURL: "/",
    });
  }
};
