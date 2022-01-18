import Layout from "../components/Layout";
import Overview from "../components/Overview";
import { useContext, useEffect } from "react";
import UserContext from "../components/context/user";

const IndexPage = () => {
  const userContext = useContext(UserContext);
  useEffect(() => {
    console.log("userContext:", userContext);
  }, [userContext]);
  return (
    <div className="bg-port-900 text-port-100">
      <Layout title="Home" heading="Overview">
        <Overview />
      </Layout>
    </div>
  );
};

export default IndexPage;
