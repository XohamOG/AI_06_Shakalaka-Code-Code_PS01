import React from "react";
import Layout from "./layoutemployee"; 
import AvatarChatbot from "./AvatarChatbot";
import DocumentUploader from "./DocumentUploader"; 

const Employee = () => {
  return (
    <Layout>
      {/* ✅ Include AvatarChatbot */}
      <AvatarChatbot />

      
    </Layout>
  );
};

export default Employee;
