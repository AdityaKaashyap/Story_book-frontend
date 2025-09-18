import React, { useState } from "react";
import { EllipsisVertical } from "lucide-react"; // 3-dots icon
import api from "../api/api";

export default function DeletePost({ postId, onDelete }) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("access");
      await api.delete(`/post/${postId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onDelete(postId); // tell parent to remove this post from UI
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to delete post. Maybe you are not the owner.");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-1 hover:bg-gray-100 rounded-full"
      >
        <EllipsisVertical className="w-5 h-5 text-gray-600" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
          <button
            onClick={handleDelete}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Delete Post
          </button>
        </div>
      )}
    </div>
  );
}
