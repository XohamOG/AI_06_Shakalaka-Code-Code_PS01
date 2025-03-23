import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { Typography, Box, CircularProgress, Paper, Divider, List, ListItem } from "@mui/material";
import { FaUser, FaRobot } from "react-icons/fa";
import JSZip from "jszip";

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

const MessageList = styled(List)({
  padding: 0,
});

const MessageItem = styled(ListItem)({
  display: 'flex',
  padding: '12px 0',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
});

const UserMessage = styled('div')({
  background: 'rgba(138, 43, 226, 0.2)',
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
  background: 'rgba(138, 43, 226, 0.3)',
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
      setError('Failed to load chat history. Please try again later.');
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
      ) : error ? (
        <Typography variant="h6" gutterBottom>{error}</Typography>
      ) : chatSessions.length === 0 ? (
        <Typography variant="h5" gutterBottom>No chat history found</Typography>
      ) : (
        chatSessions.map((session) => (
          <ChatSessionCard key={session.chatId}>
            <Typography variant="h5" fontWeight="600" color="#fff">
              {session.chatId || 'Chat Session'}
            </Typography>
            <Divider sx={{ background: 'rgba(255,255,255,0.1)', my: 2 }} />
            <MessageList>
              {session.messages.map((msg, index) => (
                <MessageItem key={index} alignItems="flex-start" sx={{
                  justifyContent: msg.role === 'user' ? 'flex-start' : 'flex-end'
                }}>
                  {msg.role === 'user' ? (
                    <>
                      <SenderIcon>
                        <FaUser color="#fff" />
                      </SenderIcon>
                      <UserMessage>
                        <Typography variant="body1">{msg.content}</Typography>
                      </UserMessage>
                    </>
                  ) : (
                    <>
                      <AIMessage>
                        <Typography variant="body1">{msg.content}</Typography>
                      </AIMessage>
                      <SenderIcon>
                        <FaRobot color="#fff" />
                      </SenderIcon>
                    </>
                  )}
                </MessageItem>
              ))}
            </MessageList>
          </ChatSessionCard>
        ))
      )}
    </PageContainer>
  );
};

export default ChatHistory;
