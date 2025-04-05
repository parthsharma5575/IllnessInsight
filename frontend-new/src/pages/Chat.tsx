import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  CircularProgress,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';

interface Message {
  text: string;
  isUser: boolean;
}

const Chat = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { text: data.response, isUser: false }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: 'Sorry, I encountered an error. Please try again.', 
        isUser: false 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 2 }}
        >
          Back to Home
        </Button>
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          component="h1" 
          gutterBottom
          sx={{ 
            textAlign: 'center',
            mb: 2
          }}
        >
          AI Health Assistant
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            textAlign: 'center',
            mb: 4,
            px: { xs: 2, md: 0 }
          }}
        >
          Ask any health-related questions and get instant responses from our AI assistant.
        </Typography>
      </Box>

      <Paper 
        elevation={3} 
        sx={{ 
          height: '60vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2
        }}
      >
        <Box 
          sx={{ 
            flexGrow: 1, 
            overflow: 'auto',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <List>
            {messages.map((message, index) => (
              <Box key={index}>
                <ListItem
                  sx={{
                    justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                    px: 1
                  }}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      maxWidth: '70%',
                      backgroundColor: message.isUser 
                        ? theme.palette.primary.main 
                        : theme.palette.mode === 'dark' 
                          ? theme.palette.grey[800] 
                          : theme.palette.grey[100],
                      color: message.isUser 
                        ? theme.palette.primary.contrastText 
                        : theme.palette.text.primary,
                      borderRadius: 2
                    }}
                  >
                    <ListItemText
                      primary={message.text}
                      sx={{
                        '& .MuiListItemText-primary': {
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word'
                        }
                      }}
                    />
                  </Paper>
                </ListItem>
                {index < messages.length - 1 && <Divider variant="middle" sx={{ my: 1 }} />}
              </Box>
            ))}
          </List>
          <Box ref={messagesEndRef} />
        </Box>

        <Box 
          component="form"
          onSubmit={handleSubmit}
          sx={{ 
            p: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            gap: 1
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            disabled={loading}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !input.trim()}
            sx={{
              minWidth: '100px',
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
              }
            }}
          >
            {loading ? <CircularProgress size={24} /> : <SendIcon />}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat; 