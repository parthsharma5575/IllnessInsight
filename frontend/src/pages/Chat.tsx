import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ChatMessage } from '../types';

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your Health assistant. Ask me about health tips or about diseases!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/chat');
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: event.data },
      ]);
      setIsLoading(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !isConnected || isLoading) return;

    const message = input.trim();
    setInput('');
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    wsRef.current?.send(message);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Healthcare Assistant
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary" sx={{ mb: 4 }}>
        Ask me anything about health, diseases, or general medical advice
      </Typography>

      <Card sx={{ maxWidth: 800, mx: 'auto', height: '70vh', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1, overflow: 'auto', pb: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {messages.map((message, index) => (
              <Paper
                key={index}
                elevation={1}
                sx={{
                  p: 2,
                  maxWidth: '80%',
                  alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                  bgcolor: message.role === 'user' ? 'primary.main' : 'grey.100',
                  color: message.role === 'user' ? 'white' : 'text.primary',
                }}
              >
                <Typography>{message.content}</Typography>
              </Paper>
            ))}
            {isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <CircularProgress size={24} />
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>
        </CardContent>
        <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={!isConnected || isLoading}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={!isConnected || isLoading || !input.trim()}
                sx={{ minWidth: 100 }}
              >
                <SendIcon />
              </Button>
            </Box>
          </form>
        </Box>
      </Card>
    </Box>
  );
};

export default Chat; 