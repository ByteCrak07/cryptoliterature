import type { NextPage } from "next";
import ComingSoon from "../components/general/coming-soon";
import Seo from "../components/general/seo";

const MiAmor: NextPage = () => {
  return (
    <main className="main-div">
      <Seo
        title="Mi Amor | Cryptoliterature"
        description="Register for Mi Amor"
        path="/mi-amor"
      />

      <section className="flex w-100 justify-center pt-10 pb-24">
        <div className="rounded-3xl overflow-hidden w-80 xs:w-full">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSeU4B6HHLzWo4hLyrCf_TBbiUYWB6XBysXhkQaEFAwKG0tYLA/viewform?embedded=true"
            width="640"
            height="812"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="w-full h-[1100px] xs:h-[920px]"
          >
            Loading…
          </iframe>
        </div>
      </section>
    </main>
  );
};

export default MiAmor;
