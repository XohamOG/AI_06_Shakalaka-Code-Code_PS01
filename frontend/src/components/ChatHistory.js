import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { Typography, Box, CircularProgress, Paper, Divider, List, ListItem } from "@mui/material";
import { FaUser, FaRobot } from "react-icons/fa";

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

const ChatHistory = () => {
  const [chatSessions, setChatSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChatHistory = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const postUrl = 'https://api.d-id.com/agents/chats/exports';
      const postOptions = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Basic ZG1Wa1lYQmhkR3RwTVVCbmJXRnBiQzVqYjIwOk8wcDFab201TmRMNHNJUWZEeHgxbA=='
        },
        body: JSON.stringify({
          agent_id: 'agt_WCqKlZPh'
        })
      };
      
      const postResponse = await fetch(postUrl, postOptions);
      const postData = await postResponse.json();
      
      if (postResponse.ok) {
        const chatExportId = postData.id;
        
        const getUrl = `https://api.d-id.com/agents/chats/exports/${chatExportId}`;
        const getOptions = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            authorization: 'Basic YW1GcGEzTmtaWE5oY2tCbmJXRnBiQzVqYjIwOndxNUtyUVlPcGdYSVNLdWVteWVjTg=='
          }
        };
        
        const getResponse = await fetch(getUrl, getOptions);
        const getData = await getResponse.json();
        
        if (getResponse.ok) {
          setChatSessions(getData.chats || []);
        } else {
          throw new Error(getData.message || 'Failed to fetch chat history');
        }
      } else {
        throw new Error(postData.message || 'Failed to initiate chat export');
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
          <ChatSessionCard key={session.id}>
            <Typography variant="h5" fontWeight="600" color="#fff">
              {session.title || 'Chat Session'}
            </Typography>
            <Divider sx={{ background: 'rgba(255,255,255,0.1)', my: 2 }} />
            <List>
              {session.messages.map((msg, index) => (
                <ListItem key={index}>
                  <Typography variant="body1">{msg.message}</Typography>
                </ListItem>
              ))}
            </List>
          </ChatSessionCard>
        ))
      )}
    </PageContainer>
  );
};

export default ChatHistory;