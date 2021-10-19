import type { NextPage } from "next";
import ComingSoon from "../components/general/coming-soon";
import Seo from "../components/general/seo";

const ErrorPg: NextPage = () => {
  return (
    <>
      <Seo
        title="Coming soon | Cryptoliterature"
        description="Our website is coming soon"
        path={null}
      />

      <ComingSoon />
    </>
  );
};

export default ErrorPg;
