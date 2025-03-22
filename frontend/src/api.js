import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"; // Django backend URL

// Ask Question API (First checks FAQs, then OpenAI)
export const askQuestion = async (question) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/ask-question/`, { question });
    return response.data;
  } catch (error) {
    console.error("Error asking question:", error);
    return { error: "Failed to get a response" };
  }
};

// Generate Avatar Response API (D-ID Integration)
export const generateAvatarResponse = async (text) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/generate-avatar/`, { text });
    return response.data;
  } catch (error) {
    console.error("Error generating avatar response:", error);
    return { error: "Failed to generate avatar response" };
  }
};
