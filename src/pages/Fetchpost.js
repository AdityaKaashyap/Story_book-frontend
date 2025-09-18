import React, { useState, useEffect } from "react";
import api from "../api/api";

export default function PostFeed() {
  const [myPosts, setMyPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("my");
  const [error, setError] = useState(null);

  const token = localStorage.getItem("access");

  const fetchMyPosts = async () => {
    try {
      const res = await api.get("/showposts/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyPosts(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load your posts.");
    }
  };

  const fetchAllPosts = async () => {
    try {
      const res = await api.get("/post/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllPosts(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load all posts.");
    }
  };

  useEffect(() => {
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }
    fetchMyPosts();
    fetchAllPosts();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const currentPosts = activeTab === "my" ? myPosts : allPosts;

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Tabs */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setActiveTab("my")}
          className={`px-4 py-2 rounded-l ${
            activeTab === "my" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          My Posts
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-r ${
            activeTab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All Posts
        </button>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {currentPosts.length === 0 ? (
          <div className="text-center text-gray-500">No posts found</div>
        ) : (
          currentPosts.map((post) => (
            <div
              key={post.id}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <p className="font-bold">{post.user}</p>
              <p>{post.caption}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="mt-2 rounded max-h-64 object-cover"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
