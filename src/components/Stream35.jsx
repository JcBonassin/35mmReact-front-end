import React, { useEffect, useState, useContext } from 'react';
import { history } from '../helpers'; 
import { userService } from '../services';
import { PhotoContext, PhotoDispatchContext } from '../contexts';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
 
 
function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://www.jcbonassin.net/">
          35MM
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
 
 const theme = createTheme();
 
 function Stream35({profile}) {

  const photos = useContext(PhotoContext)
  const setPhotos = useContext(PhotoDispatchContext)

  useEffect(() => {
    let cancel = false;
    userService.getPhotos(profile).then((photos) => {
        if (cancel) return;
        setPhotos(photos);
      });
      return () => { 
        cancel = true;
      }
    }, []);

    function srcset(photo, width, height, rows = 1, cols = 1) {
      return {
        src: `${photo}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
        srcSet: `${photo}?w=${width * cols}&h=${
          height * rows
        }&fit=crop&auto=format&dpr=2 2x`,
      };
    }
     
 return (
     <>

     <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
            {/* <h1>Hey {profile.username}!</h1> */}
              Your 35mm
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Hey {profile.username}
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained"onClick={() => history.push("/upload")}>Upload</Button>
              <Button variant="outlined"onClick={() => history.push("/blog")} >Blog</Button>
            </Stack>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {/* <Button variant="contained" onClick={update} >Update</Button> */}
            </Stack>
          </Container>
        </Box>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Community Best Photos
        </Typography>  
        <Container sx={{ py: 4 }} maxWidth="md" >       
          {/* End hero unit */}
          {/* <Grid container spacing={4}> */}
            {/* {cards.map((card) => ( */}
              {/* <Grid item  xs={12} sm={6} md={4}> */}
                {/* <Card */}
                  {/* sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} */}
                {/* > */}
                  <CardMedia   
                //   onClick={() => window.location.reload()}
                    component="img"
                    sx={{
                      16:9,
                      pt: '1%',
                    }}
                    image={`https://source.unsplash.com/random`}
                    alt="random"
                  />
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {/* Heading */}
                    </Typography>
                    <Typography>
                      {/* This is a media card. You can use this section to describe the */}
                      {/* content. */}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* <Button size="small">View</Button> */}
                    {/* <Button size="small">Edit</Button> */}
                  </CardActions>
                {/* </Card> */}
              {/* </Grid> */}
            {/* ))} */}
          {/* </Grid> */}
            </Container>
        </main>
    </ThemeProvider>     
    </>
    <>
   
    <Container sx={{ py: 4 }} maxWidth="md" > 
    <Typography variant="h5" align="center" color="text.secondary" paragraph>
      Your Photos {profile.username}
    <ListSubheader>{photos.length} photos on your Stream</ListSubheader>
    </Typography> 
    <ImageList
      sx={{
        width: 850,
        height: 850,
        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
        transform: 'translateZ(0)',
      }}
      rowHeight={200}
      gap={1}
    >
      {photos.map((photo, index) => {
        const cols = photo.featured ? 2 : 1;
        const rows = photo.featured ? 2 : 1;

        return (
          <ImageListItem key={index} cols={cols} rows={rows}>
            <img
              {...srcset(photo.featured_image.url, 250, 200, rows, cols)}
              alt={photo.title}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              title={photo.title}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  aria-label={`star ${photo.title}`}
                >
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
    </Container>
    </>

     {/* Footer */}
     <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          35MM
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Share your awesome Photos!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </>

    );

}

export { Stream35 }
 
