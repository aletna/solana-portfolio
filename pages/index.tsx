import Layout from "../components/Layout";
import Overview from "../components/Overview";
import { useContext } from "react";

const IndexPage = () => {
  return (
    <div>
      <Layout title="Home" heading="Overview">
        <Overview />
      </Layout>
    </div>
  );
};

export default IndexPage;
