import React, { useState } from "react";
import api from "../api/api";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const token = localStorage.getItem("access"); // JWT access token

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

      console.log("Post created:", res.data);
      alert("Post created successfully!");
      setCaption("");
      setImage(null);
      setShowForm(false); // close the form after posting
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to create post. Are you logged in?");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
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
    </div>
  );
}
