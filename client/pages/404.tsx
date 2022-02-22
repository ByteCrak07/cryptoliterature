import type { NextPage } from "next";
import Link from "next/link";
import ComingSoon from "../components/general/coming-soon";
import Seo from "../components/general/seo";

const ErrorPg: NextPage = () => {
  return (
    <main className="main-div">
      <Seo
        title="Page not found | Cryptoliterature"
        description="No page found for this url"
        path={null}
      />

      <div className="h-full w-full flex flex-col items-center justify-center">
        <h1 className="text-2xl">404 : Page not found</h1>
        <Link href="/">
          <a className="my-4 py-2 px-4 rounded-full bg-lit-dark text-white">
            Go to home
          </a>
        </Link>
      </div>

      {/* <ComingSoon /> */}
    </main>
  );
};

export default ErrorPg;
