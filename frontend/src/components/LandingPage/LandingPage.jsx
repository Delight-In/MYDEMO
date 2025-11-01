import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Box,
  Fade,
  Slide,
  Grow,
  CssBaseline,
  alpha,
  IconButton,
  useTheme,
  useMediaQuery
} from "@mui/material";
import {
  ArrowForward,
  PlayArrow,
  TrendingUp,
  Group,
  School,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Menu as MenuIcon
} from "@mui/icons-material";

// Sample data for career paths
const careerPaths = [
  {
    title: "Software Engineer",
    description: "Learn the skills to become a professional software developer.",
    image: "https://source.unsplash.com/featured/?programming,code",
    duration: "6-12 months",
    level: "Beginner to Advanced"
  },
  {
    title: "Data Scientist",
    description: "Analyze and interpret complex data to help make informed decisions.",
    image: "https://source.unsplash.com/featured/?data,science",
    duration: "8-14 months",
    level: "Intermediate"
  },
  {
    title: "UX/UI Designer",
    description: "Design beautiful and intuitive user experiences.",
    image: "https://source.unsplash.com/featured/?design,ui",
    duration: "4-9 months",
    level: "Beginner Friendly"
  },
  {
    title: "Digital Marketer",
    description: "Master the art of marketing in the digital world.",
    image: "https://source.unsplash.com/featured/?marketing,digital",
    duration: "3-7 months",
    level: "All Levels"
  }
];

const features = [
  { icon: <TrendingUp sx={{ fontSize: 40 }} />, title: "Career Growth", description: "Accelerate your professional journey" },
  { icon: <Group sx={{ fontSize: 40 }} />, title: "Expert Community", description: "Learn from industry professionals" },
  { icon: <School sx={{ fontSize: 40 }} />, title: "Structured Learning", description: "Curated paths for success" }
];

const LandingPage = ({ setCurrentView }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ 
      width: '100vw',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      overflowX: 'hidden',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <CssBaseline />
      
      {/* Enhanced AppBar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: alpha(theme.palette.background.paper, 0.95),
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          color: theme.palette.text.primary,
          width: '100vw'
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 } }}>
          <Toolbar sx={{ justifyContent: 'space-between', py: 1, px: 0 }}>
            <Slide in={true} direction="right" timeout={800}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #1976d2, #00bcd4)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                CareerPath
              </Typography>
            </Slide>

            {!isMobile ? (
              <Box sx={{ display: 'flex', gap: 3 }}>
                {['Home', 'Courses', 'Mentors', 'Success Stories', 'Contact'].map((item, index) => (
                  <Slide in={true} direction="down" timeout={600 + index * 100} key={item}>
                    <Button 
                      color="inherit" 
                      sx={{ 
                        fontWeight: 600,
                        position: 'relative',
                        '&:after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: '50%',
                          width: 0,
                          height: '2px',
                          background: 'linear-gradient(45deg, #1976d2, #00bcd4)',
                          transition: 'all 0.3s ease',
                          transform: 'translateX(-50%)'
                        },
                        '&:hover:after': {
                          width: '100%'
                        }
                      }}
                    >
                      {item}
                    </Button>
                  </Slide>
                ))}
              </Box>
            ) : (
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
            )}

            <Slide in={true} direction="left" timeout={800}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="outlined" 
                  sx={{ 
                    borderRadius: '25px',
                    borderWidth: '2px',
                    '&:hover': { borderWidth: '2px' }
                  }}
                  onClick={() => setCurrentView('login')} 
                  className="btn secondary-btn"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => setCurrentView('register')} 
                  className="btn primary-btn"
                  variant="contained" 
                  sx={{ 
                    borderRadius: '25px',
                    background: 'linear-gradient(45deg, #1976d2, #00bcd4)',
                    boxShadow: '0 4px 15px 0 rgba(25, 118, 210, 0.3)'
                  }}
            >
                  Get Started
                </Button>
              </Box>
            </Slide>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section - Full Viewport */}
      <Box
        sx={{
          width: '100vw',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.9) 0%, rgba(0, 188, 212, 0.8) 100%), url("https://source.unsplash.com/1600x900/?career,success,technology")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
          margin: 0,
          padding: 0
        }}
      >
        <Container 
          maxWidth={false} 
          sx={{ 
            width: '100%',
            maxWidth: '100%',
            px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 }
          }}
        >
          <Grid container spacing={6} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6} lg={5}>
              <Fade in={true} timeout={1000}>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Typography 
                    variant="h1" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 'bold',
                      fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                      lineHeight: 1.2,
                      mb: 3
                    }}
                  >
                    Discover Your 
                    <Box 
                      component="span" 
                      sx={{ 
                        background: 'linear-gradient(45deg, #ffd54f, #ffecb3)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        display: 'block'
                      }}
                    >
                      Dream Career
                    </Box>
                  </Typography>
                  
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 4,
                      opacity: 0.9,
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                      lineHeight: 1.6
                    }}
                  >
                    Transform your future with expertly curated career paths, 
                    personalized guidance, and the skills that employers are looking for.
                  </Typography>

                  <Box sx={{ 
                    display: 'flex', 
                    gap: 3, 
                    flexWrap: 'wrap',
                    justifyContent: { xs: 'center', md: 'flex-start' }
                  }}>
                    <Button
                      onClick={() => setCurrentView('login')} 
                      className="btn secondary-btn"
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForward />}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        borderRadius: '50px',
                        background: 'linear-gradient(45deg, #ffd54f, #ffb300)',
                        boxShadow: '0 8px 25px rgba(255, 181, 0, 0.4)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 35px rgba(255, 181, 0, 0.6)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Start Your Journey
                    </Button>
                    
                    {/* <Button
                      variant="outlined"
                      size="large"
                      startIcon={<PlayArrow />}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        borderRadius: '50px',
                        borderColor: '#fff',
                        color: '#fff',
                        '&:hover': {
                          borderColor: '#ffd54f',
                          color: '#ffd54f',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Watch Demo
                    </Button> */}
                  </Box>

                  <Box sx={{ 
                    mt: 4, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 4, 
                    flexWrap: 'wrap',
                    justifyContent: { xs: 'center', md: 'flex-start' }
                  }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>50K+</Typography>
                      <Typography variant="body2">Successful Graduates</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>200+</Typography>
                      <Typography variant="body2">Career Paths</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>98%</Typography>
                      <Typography variant="body2">Job Placement</Typography>
                    </Box>
                  </Box>
                </Box>
              </Fade>
            </Grid>

            <Grid item xs={12} md={6} lg={5}>
              <Fade in={true} timeout={1000} style={{ transitionDelay: '500ms' }}>
                <Box
                  sx={{
                    position: 'relative',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: -20,
                      left: -20,
                      right: 20,
                      bottom: 20,
                      background: 'linear-gradient(45deg, rgba(255, 213, 79, 0.3), rgba(0, 188, 212, 0.3))',
                      borderRadius: '30px',
                      zIndex: 0
                    }
                  }}
                >
                  <Box
                    component="img"
                    src="https://source.unsplash.com/600x400/?career,workspace"
                    sx={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '20px',
                      position: 'relative',
                      zIndex: 1,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.02)'
                      }
                    }}
                  />
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section - Full Width */}
      <Box sx={{ width: '100vw', py: 12 }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 } }}>
          <Fade in={true} timeout={1000}>
            <Typography 
              variant="h2" 
              textAlign="center" 
              sx={{ 
                mb: 2,
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #1976d2, #00bcd4)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Why Choose CareerPath?
            </Typography>
          </Fade>

          <Typography 
            variant="h6" 
            textAlign="center" 
            color="text.secondary" 
            sx={{ mb: 8, maxWidth: 600, mx: 'auto' }}
          >
            We provide everything you need to launch and grow your career
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grow in={true} timeout={800 + index * 200}>
                  <Card
                    sx={{
                      textAlign: 'center',
                      p: 4,
                      height: '100%',
                      maxWidth: 400,
                      width: '100%',
                      border: 'none',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        color: 'primary.main',
                        mb: 2
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Career Paths Section - Full Width */}
      <Box sx={{ width: '100vw', py: 12, background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 } }}>
          <Fade in={true} timeout={1000}>
            <Typography 
              variant="h2" 
              textAlign="center" 
              sx={{ 
                mb: 2,
                fontWeight: 'bold'
              }}
            >
              Explore Career Paths
            </Typography>
          </Fade>

          <Typography 
            variant="h6" 
            textAlign="center" 
            color="text.secondary" 
            sx={{ mb: 8, maxWidth: 600, mx: 'auto' }}
          >
            Choose from our carefully designed career paths and start your journey today
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {careerPaths.map((career, index) => (
              <Grid item xs={12} sm={6} md={6} lg={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grow in={true} timeout={800 + index * 200}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                      border: 'none',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                      maxWidth: 400,
                      width: '100%',
                      '&:hover': {
                        transform: 'translateY(-15px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="220"
                      image={career.image}
                      alt={career.title}
                      sx={{ 
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                        {career.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                        {career.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
                        <Typography variant="caption" color="primary" sx={{ fontWeight: 'bold' }}>
                          {career.duration}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {career.level}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions sx={{ p: 3, pt: 0 }}>
                      <Button 
                        size="small" 
                        fullWidth 
                        variant="outlined"
                        sx={{ borderRadius: '20px' }}
                      >
                        Explore
                      </Button>
                      <Button 
                        size="small" 
                        fullWidth 
                        variant="contained"
                        sx={{ 
                          borderRadius: '20px',
                          background: 'linear-gradient(45deg, #1976d2, #00bcd4)'
                        }}
                      >
                        Enroll Now
                      </Button>
                    </CardActions>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section - Full Width */}
      <Box
        sx={{
          width: '100vw',
          py: 15,
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.95) 0%, rgba(0, 188, 212, 0.9) 100%), url("https://source.unsplash.com/1600x900/?success,achievement")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          position: 'relative'
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 } }}>
          <Fade in={true} timeout={1000}>
            <Typography 
              variant="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}
            >
              Ready to Transform Your Career?
            </Typography>
          </Fade>
          
          <Fade in={true} timeout={1000} style={{ transitionDelay: '300ms' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 6, 
                maxWidth: 600, 
                mx: 'auto',
                opacity: 0.9
              }}
            >
              Join thousands of successful professionals who transformed their careers with us
            </Typography>
          </Fade>

          <Fade in={true} timeout={1000} style={{ transitionDelay: '600ms' }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                borderRadius: '50px',
                background: 'linear-gradient(45deg, #ffd54f, #ffb300)',
                color: '#000',
                boxShadow: '0 8px 25px rgba(255, 181, 0, 0.4)',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 15px 35px rgba(255, 181, 0, 0.6)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Start Your Free Trial
            </Button>
          </Fade>
        </Container>
      </Box>

      {/* Footer - Full Width */}
      <Box
        sx={{
          width: '100vw',
          background: 'linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)',
          color: '#fff',
          py: 8
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 } }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                CareerPath
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.8, maxWidth: 400 }}>
                Empowering individuals to discover their perfect career path through expert guidance, 
                structured learning, and community support.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {[Facebook, Twitter, LinkedIn, Instagram].map((Icon, index) => (
                  <IconButton key={index} sx={{ color: '#fff', '&:hover': { color: '#ffd54f' } }}>
                    <Icon />
                  </IconButton>
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={6} md={3}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Company
              </Typography>
              {['About Us', 'Careers', 'Press', 'Blog'].map((item) => (
                <Button key={item} color="inherit" sx={{ display: 'block', textAlign: 'left', justifyContent: 'flex-start' }}>
                  {item}
                </Button>
              ))}
            </Grid>
            
            <Grid item xs={6} md={3}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Support
              </Typography>
              {['Help Center', 'Contact', 'Privacy', 'Terms'].map((item) => (
                <Button key={item} color="inherit" sx={{ display: 'block', textAlign: 'left', justifyContent: 'flex-start' }}>
                  {item}
                </Button>
              ))}
            </Grid>
          </Grid>
          
          <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4, pt: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              &copy; 2025 CareerPath Explorer. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;