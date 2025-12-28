import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#212121', color: 'white', py: 3, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom sx={{ color: '#D32F2F', fontWeight: 'bold' }}>
          Joystik
        </Typography>
        <Typography variant="body2" align="center" sx={{ color: '#9e9e9e' }}>
          {'Copyright © '}
          Joystik {new Date().getFullYear()}
          {'. All rights reserved.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
