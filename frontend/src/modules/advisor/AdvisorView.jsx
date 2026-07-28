import React, { useState, useRef, useEffect } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Avatar, Paper, Grid, Chip, CircularProgress } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export const AdvisorView = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { 
      sender: 'ai', 
      text: 'Good day. I am your AI Fund Manager. I continuously track broad index levels, FII block trades, yields, and geopolitical risk premium. Ask me anything about your asset allocations, market drawdowns, or general SIP/lump-sum strategy.' 
    }
  ]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const suggestedQuestions = [
    'Should I continue SIP?',
    'Should I invest lump sum?',
    'Why is my portfolio falling?',
    'Explain today\'s correction'
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textToSend) => {
    const questionText = textToSend || query;
    if (!questionText.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: questionText }]);
    setQuery('');
    setLoading(true);

    try {
      const response = await api.advisor.ask(questionText);
      setMessages(prev => [...prev, { sender: 'ai', text: response.answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', text: `Consultation Error: ${err.message || 'Unable to connect to NVIDIA NIM. Confirm your API settings.'}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 160px)', animation: 'fadeIn 0.5s ease-out' }}>
      {/* Title */}
      <Box sx={{ borderLeft: '4px solid #2962ff', pl: 1.5, mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
          AI Investment Advisor
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Context-aware consultations on portfolio positioning powered by NVIDIA NIM.
        </Typography>
      </Box>

      {/* Main Chat Panel */}
      <Grid container spacing={3} sx={{ flexGrow: 1, minHeight: 0 }}>
        {/* Chat History */}
        <Grid item xs={12} md={9} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Paper 
            sx={{ 
              flexGrow: 1, 
              p: 2.5, 
              bgcolor: '#111524', 
              border: '1px solid #2a2e39', 
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mb: 2
            }}
          >
            {messages.map((msg, index) => (
              <Box 
                key={index}
                sx={{ 
                  display: 'flex', 
                  gap: 1.5,
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '75%',
                  flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
                }}
              >
                <Avatar 
                  sx={{ 
                    bgcolor: msg.sender === 'user' ? 'primary.main' : 'secondary.dark',
                    width: 32,
                    height: 32,
                    border: '1px solid #2a2e39'
                  }}
                >
                  {msg.sender === 'user' ? <AccountCircleIcon /> : <PsychologyIcon />}
                </Avatar>
                <Box>
                  <Paper 
                    sx={{ 
                      p: 1.75, 
                      bgcolor: msg.sender === 'user' ? '#161c2e' : '#0c101b', 
                      border: '1px solid #2a2e39',
                      borderRadius: 2
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'text.primary', 
                        lineHeight: 1.5,
                        whiteSpace: 'pre-line',
                        fontSize: '0.825rem' 
                      }}
                    >
                      {msg.text}
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            ))}
            
            {loading && (
              <Box sx={{ display: 'flex', gap: 1.5, alignSelf: 'flex-start' }}>
                <Avatar sx={{ bgcolor: 'secondary.dark', width: 32, height: 32 }}>
                  <PsychologyIcon />
                </Avatar>
                <Box sx={{ display: 'flex', alignItems: 'center', p: 1.5, bgcolor: '#0c101b', borderRadius: 2, border: '1px solid #2a2e39' }}>
                  <CircularProgress size={16} sx={{ color: 'primary.main', mr: 1.5 }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                    AI Fund Manager is computing advisory context...
                  </Typography>
                </Box>
              </Box>
            )}
            <div ref={chatEndRef} />
          </Paper>

          {/* Form Entry */}
          <Paper component="form" onSubmit={(e) => { e.preventDefault(); handleSend(); }} sx={{ p: 1, bgcolor: '#111524', border: '1px solid #2a2e39', display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField 
              fullWidth
              size="small"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about SIP, portfolio returns, yields, rate cuts..."
              disabled={loading}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'transparent' },
                  '&:hover fieldset': { borderColor: 'transparent' },
                  '&.Mui-focused fieldset': { borderColor: 'transparent' },
                }
              }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              disabled={loading}
              sx={{ minWidth: 48, p: 1 }}
            >
              <SendIcon sx={{ fontSize: '1.2rem' }} />
            </Button>
          </Paper>
        </Grid>

        {/* Suggestion Sidebar */}
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '0.9rem', letterSpacing: '0.05em', color: 'text.secondary' }}>
                SUGGESTED CONSULTATIONS
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {suggestedQuestions.map((q, i) => (
                  <Chip 
                    key={i} 
                    label={q}
                    onClick={() => handleSend(q)}
                    disabled={loading}
                    clickable
                    sx={{ 
                      justifyContent: 'flex-start',
                      py: 2.5,
                      px: 1,
                      textAlign: 'left',
                      height: 'auto',
                      bgcolor: '#111524',
                      border: '1px solid #2a2e39',
                      color: 'text.primary',
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.04)', borderColor: 'primary.main' }
                    }} 
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdvisorView;
