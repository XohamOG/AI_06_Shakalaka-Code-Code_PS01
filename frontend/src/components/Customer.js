import React from "react";
import Layout from "./Layout"; // Import Layout component
import AvatarChatbot from "./AvatarChatbot"; // Import AvatarChatbot component
import { Routes, Route } from "react-router-dom";

const Customer = () => {
  return (
    <Layout>
      {/* Chatbot Component */}
      <AvatarChatbot />

      {/* Define Routes (if needed) */}
      <Routes>
        {/* Add your routes here */}
      </Routes>
    </Layout>
  );
};

export default Customer;
