import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { Typography, Box, CircularProgress, Paper, Divider, List, ListItem } from "@mui/material";
import { FaUser, FaRobot } from "react-icons/fa";
import JSZip from "jszip"; // Import JSZip to handle ZIP extraction

// Styled components
const PageContainer = styled('div')({
  padding: '30px',
  maxWidth: '1200px',
  margin: '0 auto',
});

const PageTitle = styled(Typography)({
  fontSize: '2.5rem',
  fontWeight: '700',
  marginBottom: '20px',
  background: 'linear-gradient(45deg, #e0aaff 0%, #c77dff 50%, #9d4edd 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 2px 10px rgba(138, 43, 226, 0.3)',
});

const ChatSessionCard = styled(Paper)({
  padding: '20px',
  marginBottom: '20px',
  borderRadius: '12px',
  background: 'rgba(40, 30, 60, 0.5)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(138, 43, 226, 0.2)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 0 10px rgba(138, 43, 226, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.2), 0 0 15px rgba(138, 43, 226, 0.15)',
  },
});

const MessageItem = styled(ListItem)({
  display: 'flex',
  padding: '12px 0',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
});

const UserMessage = styled('div')({
  background: 'rgba(138, 43, 226, 0.15)',
  padding: '12px 16px',
  borderRadius: '12px 12px 12px 0',
  maxWidth: '80%',
  marginLeft: '10px',
  color: '#fff',
});

const AIMessage = styled('div')({
  background: 'rgba(80, 60, 120, 0.3)',
  padding: '12px 16px',
  borderRadius: '12px 12px 0 12px',
  maxWidth: '80%',
  marginRight: '10px',
  color: '#fff',
});

const SenderIcon = styled('div')({
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '10px',
  background: 'rgba(138, 43, 226, 0.2)',
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
});

const ChatHistory = () => {
  const [chatSessions, setChatSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChatHistory = async () => {
    setLoading(true);
    setError(null);

    try {
      const getUrl = 'https://api.d-id.com/agents/chats/exports/b1-om7vd';
      const getOptions = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: 'Basic ZG1Wa1lYQmhkR3RwTVVCbmJXRnBiQzVqYjIwOk8wcDFab201TmRMNHNJUWZEeHgxbA=='
        }
      };

      const getResponse = await fetch(getUrl, getOptions);
      const getData = await getResponse.json();

      if (getResponse.ok && getData.result && getData.result.result_url) {
        const chatDataResponse = await fetch(getData.result.result_url);
        const chatDataBlob = await chatDataResponse.blob();

        if (chatDataBlob.type !== "application/zip") {
          throw new Error("Invalid file type. Expected a ZIP file.");
        }

        const zip = await JSZip.loadAsync(chatDataBlob);
        const chatFiles = Object.keys(zip.files);
        
        let allChats = [];
        for (const fileName of chatFiles) {
          const fileData = await zip.files[fileName].async("text");
          const jsonData = JSON.parse(fileData);
          allChats.push(jsonData);
        }

        setChatSessions(allChats);
      } else {
        throw new Error(getData.message || 'Failed to fetch chat history');
      }
    } catch (err) {
      console.error('Error fetching chat history:', err);
      setError('Failed to load chat history. Using mock data.');
      
      // Use mock data
      setChatSessions([
        {
          id: 'chat_001',
          title: 'What is IDMS Infotech?',
          messages: [
            { sender: 'user', message: 'Hello, can you tell me what IDMS Infotech is all about?' },
            { sender: 'ai', message: 'Sure! IDMS Infotech is a technology-driven company specializing in ERP solutions for businesses. We help streamline operations through advanced software tools and automation.' },
            { sender: 'user', message: 'What industries do you serve?' },
            { sender: 'ai', message: 'We provide ERP solutions for various industries, including manufacturing, retail, healthcare, education, and logistics.' }
          ]
        },
        {
          id: 'chat_002',
          title: 'IDMS ERP Features',
          messages: [
            { sender: 'user', message: 'What are the key features of your ERP system?' },
            { sender: 'ai', message: 'Our ERP system includes modules for inventory management, finance, HR, CRM, supply chain, and analytics. It’s designed to enhance efficiency and decision-making.' },
            { sender: 'user', message: 'Is your ERP cloud-based or on-premise?' },
            { sender: 'ai', message: 'We offer both cloud-based and on-premise solutions to suit different business needs.' }
          ]
        }
      ]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  return (
    <PageContainer>
      <PageTitle variant="h1">Chat History</PageTitle>
      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress size={60} sx={{ color: '#9d4edd' }} />
        </Box>
      ) : (
        chatSessions.map((session) => (
          <ChatSessionCard key={session.id}>
            <Typography variant="h5" fontWeight="600" color="#fff">
              {session.title}
            </Typography>
            <Divider sx={{ background: 'rgba(255,255,255,0.1)', my: 2 }} />
            <List>
              {session.messages.map((msg, index) => (
                <MessageItem key={index}>
                  <SenderIcon>{msg.sender === 'user' ? <FaUser color="#fff" /> : <FaRobot color="#fff" />}</SenderIcon>
                  {msg.sender === 'user' ? <UserMessage>{msg.message}</UserMessage> : <AIMessage>{msg.message}</AIMessage>}
                </MessageItem>
              ))}
            </List>
          </ChatSessionCard>
        ))
      )}
    </PageContainer>
  );
};

export default ChatHistory;
