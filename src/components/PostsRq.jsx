import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const fetchPosts = () => {
  return axios.get("http://localhost:4000/posts");
};

const addPost = (post) => {
  return axios.post("http://localhost:4000/posts", post);
};

const PostsRq = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const queryClient = useQueryClient();

  // /posts ["posts"]
  // /post/1 ["posts", post.id]
  // /posts/1/comments ["posts", post.id, "comments"]

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    // staleTime: 30000
    // refetchInterval: 1000, // for polling
    // refetchIntervalInBackground: true // even if you are in other tab it will keep on polling
    // enabled: false
  });

  const { mutate: addPostMutation } = useMutation({
    mutationFn: addPost,
    // onSuccess: (newData) => {
    // queryClient.invalidateQueries("posts")
    //   queryClient.setQueryData(["posts"], (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, newData.data]
    //     }
    //   })
    // }

    // FOR OPTIMISTIC UPDATES:
    onMutate: async (newPost) => {
      await queryClient.cancelQueries(["posts"]);
      const previousData = queryClient.getQueryData(["posts"]);
      queryClient.setQueryData(["posts"], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { ...newPost, id: String(oldQueryData.data.length + 1) },
          ],
        };
      });

      return { previousData };
    },
    onError: (_error, _post, context) => {
      queryClient.setQueryData(["posts"], context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  console.log({ isLoading, isFetching });

  if (isLoading) {
    return <div>Page is loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { title, body };
    addPostMutation(post);
    setTitle("");
    setBody("");
  };

  return (
    <div className="post-list">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={body}
          placeholder="Enter body"
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {/* <button onClick={refetch}> Fetch Posts </button> */}
      {data?.data?.map((post) => (
        <Link key={post.id} to={`/rq-posts/${post.id}`}>
          <div className="post-item" key={post.id}>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostsRq;
