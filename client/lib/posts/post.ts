import { PostData } from "../../interfaces/posts";

export async function createUser(data: any) {
  return await console.log("create user", data);
}

export async function createPost(data: PostData) {
  return await console.log("create", data);
}

export async function savePost(data: PostData) {
  return await console.log("save", data);
}

export async function publishPost(slug: string) {
  return await console.log("publish", slug);
}
