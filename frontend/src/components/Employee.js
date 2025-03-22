import React from "react";
import Layout from "./layoutemployee"; // ✅ Import Layout component
import AvatarChatbot from "./AvatarChatbot"; // ✅ Import AvatarChatbot component
import DocumentUploader from "./DocumentUploader"; // ✅ Import KnowledgeUploader component

const Employee = () => {
  return (
    <Layout>
      {/* ✅ Include AvatarChatbot */}
      <AvatarChatbot />

      
    </Layout>
  );
};

export default Employee;
