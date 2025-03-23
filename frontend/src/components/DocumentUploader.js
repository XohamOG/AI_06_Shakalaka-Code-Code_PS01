import React, { useState } from "react";
import { Button, LinearProgress, Box, Typography } from "@mui/material";

const DocumentUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [response, setResponse] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please select a valid PDF file.");
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setUploading(true);
    setProgress(30);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Data = reader.result.split(",")[1]; // Extract base64 string

      const url =
        "https://api.d-id.com/knowledge/knl_TGHtQs5Pkj7r20O4ixmvG/documents";
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization:
            "Basic ZG1Wa1lYQmhkR3RwTVVCbmJXRnBiQzVqYjIwOk8wcDFab201TmRMNHNJUWZEeHgxbA==",
        },
        body: JSON.stringify({
          documentType: "pdf",
          source_url: base64Data, // Sending base64 data
          title: file.name,
        }),
      };

      try {
        setProgress(60);
        const response = await fetch(url, options);
        const result = await response.json();
        setResponse(result);
        setProgress(100);
      } catch (error) {
        console.error("Upload failed:", error);
        alert("Failed to upload file.");
      } finally {
        setUploading(false);
      }
    };
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", p: 4, bgcolor: "white", boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Upload a PDF Document
      </Typography>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleUpload}
        disabled={!file || uploading}
        sx={{ mt: 2 }}
      >
        {uploading ? "Uploading..." : "Upload"}
      </Button>
      {uploading && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      )}
      {response && (
        <Box sx={{ mt: 2, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
          <Typography variant="subtitle1">Upload Response:</Typography>
          <Typography variant="body2" component="pre" sx={{ wordWrap: "break-word" }}>
            {JSON.stringify(response, null, 2)}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DocumentUploader;
