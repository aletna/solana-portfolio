import Layout from "../components/Layout";
import Overview from "../components/Overview";



const IndexPage = () => {

  return (
    <Layout title="Home">
      <div className="p-8 w-full text-center text-2xl">Simple Portfolio Tracker</div>
      <Overview />
    </Layout>
  );
};


export default IndexPage;
