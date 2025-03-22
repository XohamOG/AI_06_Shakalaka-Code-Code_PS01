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

const SessionHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '15px',
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
  background: 'rgba(138, 43, 226, 0.15)',
  padding: '12px 16px',
  borderRadius: '12px 12px 12px 0',
  maxWidth: '80%',
  marginLeft: '10px',
});

const AIMessage = styled('div')({
  background: 'rgba(80, 60, 120, 0.3)',
  padding: '12px 16px',
  borderRadius: '12px 12px 0 12px',
  maxWidth: '80%',
  marginRight: '10px',
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

const EmptyState = styled(Box)({
  textAlign: 'center',
  padding: '50px 0',
  color: 'rgba(255,255,255,0.7)',
});

const ChatHistory = () => {
  const [chatSessions, setChatSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChatHistory = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // This is a mock implementation - replace with actual API calls
      // In a real implementation, you would:
      // 1. First call the POST endpoint to create an export
      // 2. Then call the GET endpoint with the returned ID
      
      const postUrl = 'https://api.d-id.com/agents/chats/exports';
      const postOptions = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Basic TWpBeU15NXpiMmhoYlM1d1lYUnBiRUIyWlhNdVlXTXVhVzQ6OFNBNEV6NnVrbVdES2hvNERQcU40'
        },
        body: JSON.stringify({
          agent_id: 'agt_cSWYN6Bt', // Use your actual agent ID here
          // No need to include chat_data as we're just exporting existing chats
        })
      };
      
      // For demonstration, using mock data instead of actual API call
      // In production, uncomment the fetch calls and use real data
      
      /*
      const postResponse = await fetch(postUrl, postOptions);
      const postData = await postResponse.json();
      
      if (postResponse.ok) {
        const chatExportId = postData.id;
        
        // Now fetch the export data
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
      */
      
      // Mock data for demonstration
      setTimeout(() => {
        const mockChatData = [
          {
            id: 'chat_123456',
            created_at: '2025-03-20T14:30:00Z',
            title: 'Interview Practice Session',
            messages: [
              { sender: 'user', message: 'Hello, I would like to practice for a job interview.' },
              { sender: 'ai', message: 'Hi there! I\'d be happy to help you practice for your job interview. What kind of position are you interviewing for?' },
              { sender: 'user', message: 'I have an interview for a software developer position.' },
              { sender: 'ai', message: 'Great! For a software developer position, you might expect questions about your technical skills, problem-solving abilities, and past experiences. Would you like me to ask you some common interview questions?' }
            ]
          },
          {
            id: 'chat_789012',
            created_at: '2025-03-22T10:15:00Z',
            title: 'Mock Interview - Data Scientist',
            messages: [
              { sender: 'user', message: 'Can we do a mock interview for a data scientist role?' },
              { sender: 'ai', message: 'Absolutely! I\'d be happy to conduct a mock interview for a data scientist role. Let\'s begin with some typical questions. Tell me about your experience with machine learning algorithms.' },
              { sender: 'user', message: 'I have worked with various supervised learning algorithms including regression, decision trees, and neural networks.' },
              { sender: 'ai', message: 'That\'s great. Could you share a specific project where you applied one of these algorithms and what challenges you faced?' }
            ]
          }
        ];
        
        setChatSessions(mockChatData);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      console.error('Error fetching chat history:', err);
      setError('Failed to load chat history. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <PageContainer>
      <PageTitle variant="h1">Chat History</PageTitle>
      
      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress size={60} sx={{ color: '#9d4edd' }} />
        </Box>
      ) : error ? (
        <EmptyState>
          <Typography variant="h6" gutterBottom>
            {error}
          </Typography>
          <Typography variant="body1">
            Please check your connection and try again.
          </Typography>
        </EmptyState>
      ) : chatSessions.length === 0 ? (
        <EmptyState>
          <Typography variant="h5" gutterBottom>
            No chat history found
          </Typography>
          <Typography variant="body1">
            Your chat sessions will appear here once you start conversing with NexBot.
          </Typography>
        </EmptyState>
      ) : (
        chatSessions.map((session) => (
          <ChatSessionCard key={session.id}>
            <SessionHeader>
              <Typography variant="h5" fontWeight="600">
                {session.title || 'Chat Session'}
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.7)">
                {formatDate(session.created_at)}
              </Typography>
            </SessionHeader>
            
            <Divider sx={{ background: 'rgba(255,255,255,0.1)', my: 2 }} />
            
            <MessageList>
              {session.messages.map((msg, index) => (
                <MessageItem key={index} alignItems="flex-start" sx={{ 
                  justifyContent: msg.sender === 'user' ? 'flex-start' : 'flex-end'
                }}>
                  {msg.sender === 'user' ? (
                    <>
                      <SenderIcon>
                        <FaUser color="#fff" />
                      </SenderIcon>
                      <UserMessage>
                        <Typography variant="body1">{msg.message}</Typography>
                      </UserMessage>
                    </>
                  ) : (
                    <>
                      <AIMessage>
                        <Typography variant="body1">{msg.message}</Typography>
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