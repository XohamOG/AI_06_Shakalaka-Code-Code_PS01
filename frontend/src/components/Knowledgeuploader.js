import React, { useState } from "react";
import axios from "axios";

const KnowledgeUploader = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // Replace these with actual values
  const apiKey = "Z29vZ2xlLW9hdXRoMnwxMDk4NTQ4NTk4MTQ3OTY0MDI2ODg6QlFNaFp6TGN4aEk2WU1wVFZaTXIt";
  const knowledgeBaseId = "agt_cSWYN6Bt"; // Using Agent ID as Knowledge Base ID (confirm if correct)

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadKnowledge = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `https://api.d-id.com/knowledge_base/${knowledgeBaseId}/items`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Document uploaded successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error uploading document:", error);
      setMessage("Failed to upload document.");
    }
  };

  return (
    <div>
      <h2>Upload Knowledge Document</h2>
      <input type="file" onChange={handleFileChange} accept=".pdf,.txt,.docx" />
      <button onClick={uploadKnowledge}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default KnowledgeUploader;
