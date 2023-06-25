import type { GetStaticProps, NextPage } from "next";
import { Fragment } from "react";
import Seo from "../../components/general/seo";
import LatestBlogCard from "../../components/blogs/latest-blog-card";
import BlogCard from "../../components/blogs/card";
// ghost apis
import { GhostPost } from "../../interfaces/posts";
import { getPosts } from "../../lib/ghost/posts";

export const getStaticProps: GetStaticProps = async () => {
  // const posts = await getPosts();

  // if (!posts) {
  //   return {
  //     notFound: true,
  //     revalidate: 600,
  //   };
  // }

  // return {
  //   props: { posts },
  //   revalidate: 600,
  // };

  return {
    notFound: true,
  };
};

interface BlogsPageProps {
  posts: Array<GhostPost>;
}

const Blogs: NextPage<BlogsPageProps> = ({ posts }) => {
  let featuredIndex = 0;
  let featuredPost: GhostPost = posts[0];

  posts.forEach((post, i) => {
    if (post.featured) {
      featuredPost = post;
      featuredIndex = i;
    }
  });

  return (
    <main className="main-div">
      <Seo
        title="Blogs | Cryptoliterature"
        description="Our latest blogs - Cryptoliterature an epiphany to the literary world"
        path="/blogs"
      />

      <section>
        <div className="flex items-baseline">
          <h1 className="font-Poppins font-semibold text-2xl">Latest Blogs</h1>
        </div>

        <div className="lg:px-5 xl:px-32">
          <LatestBlogCard
            image={
              featuredPost.feature_image
                ? {
                    src: featuredPost.feature_image,
                    alt: featuredPost.feature_image_alt,
                    width: "2000",
                    height: "1210",
                  }
                : undefined
            }
            title={featuredPost.title}
            description={
              featuredPost.custom_excerpt
                ? featuredPost.custom_excerpt
                : featuredPost.excerpt
            }
            link={`/blogs/${featuredPost.slug}`}
            author={
              featuredPost.primary_author
                ? {
                    imgSrc: featuredPost.primary_author.profile_image,
                    name: featuredPost.primary_author.name,
                  }
                : undefined
            }
            time={featuredPost.published_at}
          />
        </div>

        <section className="my-20">
          <div className="flex flex-wrap gap-x-6 gap-y-10 justify-center">
            {posts.map((post, i) => {
              if (i !== featuredIndex) {
                return (
                  <Fragment key={`blog${i}`}>
                    <BlogCard
                      image={
                        post.feature_image
                          ? {
                              src: post.feature_image,
                              alt: post.feature_image_alt,
                              width: "2000",
                              height: "1210",
                            }
                          : undefined
                      }
                      title={post.title}
                      description={
                        post.custom_excerpt ? post.custom_excerpt : post.excerpt
                      }
                      link={`/blogs/${post.slug}`}
                      author={
                        posts[i].primary_author
                          ? {
                              imgSrc: post.primary_author.profile_image,
                              name: post.primary_author.name,
                            }
                          : undefined
                      }
                    />
                  </Fragment>
                );
              } else return <Fragment key={`blog${i}`}></Fragment>;
            })}
          </div>
        </section>
      </section>
    </main>
  );
};

export default Blogs;
