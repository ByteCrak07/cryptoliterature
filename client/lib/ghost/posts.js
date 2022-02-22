import GhostContentAPI from "@tryghost/content-api";

const api = new GhostContentAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: "v4",
});

export async function getPosts() {
  return await api.posts
    .browse({
      limit: "all",
      include: "authors",
      formats: ["plaintext", "html"],
      fields:
        "title,custom_excerpt,excerpt,slug,feature_image,feature_image_alt,featured,primary_author,published_at",
    })
    .catch((err) => {
      console.error(err);
    });
}

export async function getSinglePost(postSlug) {
  return await api.posts
    .read({
      slug: postSlug,
      include: "authors",
    })
    .catch((err) => {
      console.error(err);
    });
}
