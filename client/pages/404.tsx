import type { NextPage } from "next";
import ComingSoon from "../components/general/coming-soom";
import Seo from "../components/general/seo";

const ErrorPg: NextPage = () => {
  return (
    <>
      <Seo
        title="Coming soon | Cryptoliterature"
        description="Our website is coming soon"
      />

      <ComingSoon />
    </>
  );
};

export default ErrorPg;
