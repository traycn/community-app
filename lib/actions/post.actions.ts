"use server"

import Post from "../models/post.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";

// TODO: DELETE Post

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();

  // Calculate the number of posts to skip based on the page number and page size.
  const skipAmount = (pageNumber - 1) * pageSize;

  // Create a query to fetch the posts that have no parent (top-level posts) (a post that is not a comment/reply).
  const postsQuery = Post.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "author",
      model: User,
    })
    .populate({
      path: "children", // Populate the children field
      populate: {
        path: "author", // Populate the author field within children
        model: User,
        select: "_id name parentId image", // Select only _id and username fields of the author
      },
    });

  // Count the total number of top-level posts (posts) i.e., posts that are not comments.
  const totalPostsCount = await Post.countDocuments({
    parentId: { $in: [null, undefined] },
  }); // Get the total count of posts

  const posts = await postsQuery.exec();

  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
}

interface Params {
    text: string,
    author: string,
    path: string
}

export async function createPost({text, author, path}: Params) {
    
    try {
            
        connectToDB();

        const createdPost = await Post.create({
            text,
            author,
        });

        // Update user model
        await User.findByIdAndUpdate(author, {
            $push: { posts: createdPost._id }
        })

        revalidatePath(path);
        
    } catch (error: any) {
        throw new Error(`Error creating post: ${error.message}`);
    }
    
}


async function fetchAllChildPosts(postId: string): Promise<any[]> {
  const childPosts = await Post.find({ parentId: postId });

  const descendantPosts = [];
  for (const childPost of childPosts) {
    const descendants = await fetchAllChildPosts(childPost._id);
    descendantPosts.push(childPost, ...descendants);
  }

  return descendantPosts;
}


export async function fetchPostById(id: string) {
    connectToDB();

    try {

        const post = await Post.findById(id)
            .populate({
                path: 'author',
                model: User,
                select: "_id id name image"
            })
            .populate({
                path: 'children',
                populate: [
                    {
                        path: 'author',
                        model: User,
                        select: "_id id name parentId image"
                    },
                    {
                        path:'children',
                        model: Post,
                        populate: {
                            path: 'author',
                            model: User,
                            select: "_id id name parentId image"
                        }
                    }
                ]
            }).exec();

            return post;
    } catch (error: any) {
        throw new Error(`Error fetching post: ${error.message}`);
    }
}

export async function addCommentToPost(
    postId: string,
    commentText: string,
    userId: string,
    path: string,
) {
    connectToDB();

    try {
      // Find the original post by its ID
      const originalPost = await Post.findById(postId);

      if(!originalPost) {
        throw new Error("Post not found")
      }

      const commentPost = new Post({
        text: commentText,
        author: userId,
        parentId: postId,
      })
      
      // Save the new post
      const savedCommentPost = await commentPost.save();

      // update the original post to include the new comment
      originalPost.children.push(savedCommentPost._id);

      // Save the original post
      await originalPost.save();

      revalidatePath(path);
      
    } catch (error: any) {
        throw new Error(`Error adding comment to post: ${error.message}`)
    }


}