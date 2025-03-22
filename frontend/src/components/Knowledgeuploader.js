import React, { useState } from "react";
import axios from "axios";

const KnowledgeUploader = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // API Key should be stored in .env file for security reasons
  const apiKey = process.env.REACT_APP_DID_API_KEY;
  const knowledgeBaseId = "agt_cSWYN6Bt"; // Confirm if correct

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // Validate file type
    const allowedTypes = ["application/pdf", "text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
      setMessage("Invalid file type. Please upload a PDF, TXT, or DOCX file.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setMessage("");
  };

  const uploadKnowledge = async () => {
    if (!file) {
      setMessage("Please select a valid file.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `https://api.d-id.com/knowledge_base/${knowledgeBaseId}/items`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Document uploaded successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error uploading document:", error);

      if (error.response) {
        setMessage(`Error: ${error.response.data.message || "Upload failed."}`);
      } else {
        setMessage("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", maxWidth: "400px", margin: "auto", border: "1px solid #ddd", borderRadius: "10px" }}>
      <h2>Upload Knowledge Document</h2>
      <input type="file" onChange={handleFileChange} accept=".pdf,.txt,.docx" />
      <button 
        onClick={uploadKnowledge} 
        disabled={loading} 
        style={{ display: "block", marginTop: "10px", padding: "10px", backgroundColor: loading ? "#aaa" : "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
      {message && <p style={{ color: message.includes("successfully") ? "green" : "red" }}>{message}</p>}
    </div>
  );
};

export default KnowledgeUploader;





