import React from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  useTheme,
  alpha
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoginIcon from '@mui/icons-material/Login';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleOnHover = {
  hover: { scale: 1.05, transition: { duration: 0.3 } }
};

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      title: "Event Mastery",
      description: "Seamlessly plan, execute, and analyze events of any scale. From ticketing to real-time attendance tracking.",
      icon: <EventIcon fontSize="large" />,
      color: theme.palette.primary.main
    },
    {
      title: "Community Growth",
      description: "Nurture your members with powerful directory tools, engagement metrics, and personalized communication.",
      icon: <PeopleIcon fontSize="large" />,
      color: theme.palette.secondary.main
    },
    {
      title: "Deep Analytics",
      description: "Transform data into decisions. Visualize trends, track growth, and optimize your operations with precision.",
      icon: <BarChartIcon fontSize="large" />,
      color: theme.palette.success.main
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade protection for your data. Role-based access control and secure authentication you can trust.",
      icon: <SecurityIcon fontSize="large" />,
      color: theme.palette.error.main
    }
  ];

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          minHeight: '90vh', 
          display: 'flex', 
          alignItems: 'center', 
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.background.default, 1)} 100%)`,
          pt: 8,
          pb: 8
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp}>
                  <Typography 
                    variant="overline" 
                    color="secondary" 
                    sx={{ fontWeight: 'bold', letterSpacing: 2, fontSize: '1rem' }}
                  >
                    WELCOME TO JOYSTIK
                  </Typography>
                </motion.div>
                
                <motion.div variants={fadeInUp}>
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      fontWeight: 900, 
                      fontSize: { xs: '3rem', md: '4.5rem' },
                      lineHeight: 1.1,
                      mb: 2,
                      background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}
                  >
                    Manage with Excellence.
                  </Typography>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Typography 
                    variant="h5" 
                    color="text.secondary" 
                    sx={{ mb: 4, lineHeight: 1.6, maxWidth: '90%' }}
                  >
                    The world-class platform designed to elevate your organization. 
                    Streamline events, engage members, and unlock potential with 
                    data-driven insights.
                  </Typography>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button 
                      variant="contained" 
                      size="large" 
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => navigate('/register')}
                      sx={{ 
                        px: 4, 
                        py: 1.5, 
                        borderRadius: 2, 
                        fontSize: '1.1rem',
                        textTransform: 'none',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                      }}
                    >
                      Get Started Free
                    </Button>
                    <Button 
                      variant="outlined" 
                      size="large"
                      startIcon={<LoginIcon />} 
                      onClick={() => navigate('/login')}
                      sx={{ 
                        px: 4, 
                        py: 1.5, 
                        borderRadius: 2, 
                        fontSize: '1.1rem',
                        textTransform: 'none',
                        borderWidth: 2
                      }}
                    >
                      Sign In
                    </Button>
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box 
                  component={motion.img}
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Team Collaboration"
                  sx={{ 
                    width: '100%', 
                    borderRadius: 4,
                    boxShadow: '0 30px 60px -12px rgba(0,0,0,0.25)',
                    transform: 'perspective(1000px) rotateY(-5deg)'
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 10, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                Why Leaders Choose Joystik
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                Everything you need to build, manage, and scale your community in one 
                unified, beautifully designed platform.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover="hover"
                  variants={scaleOnHover}
                >
                  <Card 
                    elevation={0} 
                    sx={{ 
                      height: '100%', 
                      borderRadius: 4,
                      bgcolor: alpha(feature.color, 0.05),
                      border: `1px solid ${alpha(feature.color, 0.1)}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: `0 10px 30px -10px ${alpha(feature.color, 0.3)}`
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box 
                        sx={{ 
                          width: 60, 
                          height: 60, 
                          borderRadius: '50%', 
                          bgcolor: 'white', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          mb: 3,
                          color: feature.color,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 10, bgcolor: 'primary.main', color: 'white' }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <RocketLaunchIcon sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
              <Typography variant="h3" fontWeight="900" gutterBottom>
                Ready to Launch?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, fontWeight: 400 }}>
                Join thousands of organizations transforming their operations today.
                Experience the difference of world-class management.
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                onClick={() => navigate('/register')}
                sx={{ 
                  px: 6, 
                  py: 2, 
                  fontSize: '1.2rem', 
                  borderRadius: 8,
                  fontWeight: 'bold',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 25px 30px -5px rgba(0, 0, 0, 0.3)'
                  }
                }}
              >
                Start Your Journey
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
