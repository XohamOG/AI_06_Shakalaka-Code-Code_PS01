import React from "react";
import Layout from "./layoutemployee"; // ✅ Import Layout component
import AvatarChatbot from "./AvatarChatbot"; // ✅ Import AvatarChatbot component
import KnowledgeUploader from "./DocumentUploader"; // ✅ Import KnowledgeUploader component

const Employee = () => {
  return (
    <Layout>
      {/* ✅ Include AvatarChatbot */}
      <AvatarChatbot />

      {/* ✅ Include KnowledgeUploader */}
      <KnowledgeUploader />
    </Layout>
  );
};

export default Employee;
