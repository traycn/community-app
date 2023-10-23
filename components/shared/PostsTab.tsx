import { redirect } from "next/navigation";
import { fetchUserPosts } from "@/lib/actions/user.actions";
import PostCard from "../cards/PostCard";

interface Result {
  name: string;
  image: string;
  id: string;
  posts: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function PostsTab({ currentUserId, accountId, accountType }: Props) {
  let result: Result;

  result = await fetchUserPosts(accountId);

  if (!result) {
    redirect("/");
  }

  return (
    <section className='mt-9 flex flex-col gap-10'>
      {result.posts.map((post) => (
        <PostCard
          key={post._id}
          id={post._id}
          currentUserId={currentUserId}
          parentId={post.parentId}
          content={post.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: post.author.name,
                  image: post.author.image,
                  id: post.author.id,
                }
          }
          createdAt={post.createdAt}
          comments={post.children}
        />
      ))}
    </section>
  );
}

export default PostsTab;