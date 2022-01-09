import type { NextPage } from "next";
// components
import Seo from "../components/general/seo";

const NewBlog: NextPage = () => {
  return (
    <main className="main-div">
      <Seo
        title="New Blog | Cryptoliterature"
        description="Start writing a new blog"
        path="/new"
      />
    </main>
  );
};

export default NewBlog;
