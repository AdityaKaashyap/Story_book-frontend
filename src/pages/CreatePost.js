import React, { useState, useEffect } from "react";
import api from "../api/api";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState([]);

  // Fetch all posts from backend on page load
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await api.get("/post/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data); // DRF now returns full image URLs
      } catch (err) {
        console.error("Failed to fetch posts:", err.response?.data || err.message);
      }
    };

    fetchPosts();
  }, []);

  // Handle new post submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const token = localStorage.getItem("access");

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", image);

    try {
      const res = await api.post("/post/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Add new post to top of list
      setPosts([res.data, ...posts]);

      // Reset form
      setCaption("");
      setImage(null);
      setShowForm(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to create post. Are you logged in?");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-10">
      {/* Create Post Button/Form */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="mx-auto mt-16 block bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-300"
        >
          + Create Post
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full bg-white p-6 rounded-xl shadow-lg border"
        >
          <h2 className="text-xl font-semibold text-gray-800">New Post</h2>

          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="w-1/2 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Upload Post
            </button>
          </div>
        </form>
      )}

      {/* Display all posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 rounded-xl shadow-md space-y-2"
          >
            {post.image && (
              <img
                src={post.image} // now full URL from backend
                alt="Post"
                className="w-full h-60 object-cover rounded-lg"
              />
            )}
            <p className="text-gray-800">{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
