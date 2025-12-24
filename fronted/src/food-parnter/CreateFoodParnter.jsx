import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api";
import "../css/create-food.css";

function CreateFoodParnter() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setError("Please select a valid video file");
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      setError("Video must be less than 100MB");
      return;
    }

    setError(null);
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.name.trim()) return setError("Please enter food name");
    if (!formData.description.trim()) return setError("Please enter description");
    if (!videoFile) return setError("Please upload a video");

    setLoading(true);

    try {
      const uploadData = new FormData();
      uploadData.append("name", formData.name);
      uploadData.append("description", formData.description);
      uploadData.append("video", videoFile);

      await apiClient.post("/api/food", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Food video uploaded successfully 🎉");
      setFormData({ name: "", description: "" });
      setVideoFile(null);
      setVideoPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      setTimeout(() => navigate("/food-partner/profile"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-food-container">
      <div className="create-food-card">
        <h2>📹 Upload Food Video</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Food name"
            value={formData.name}
            onChange={handleInputChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          />

          {videoPreview ? (
            <video src={videoPreview} controls />
          ) : (
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
            />
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>

          <button type="button" onClick={() => navigate("/food-partner/profile")}>
            Skip
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateFoodParnter;
