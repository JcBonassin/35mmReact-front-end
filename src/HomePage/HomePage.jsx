import React, { useEffect, useContext } from 'react';
import { userService } from '../services';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { PhotoContext, PhotoDispatchContext } from '../contexts';


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



function HomePage({ profile, setProfile }) {

    const photos = useContext(PhotoContext)
    const setPhotos = useContext(PhotoDispatchContext)


      useEffect(() => {
        let cancel = false;
        userService.getUser().then((res) => {
            if (cancel) return;
            console.log(res)
            setProfile(res);
          });
          return () => { 
            cancel = true;
          }
        }, []);

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

    function onDeletePhoto(photo)  {
        userService.removePhoto(photo) ;
        setPhotos(photos.filter((p) => p.id !== photo.id));
      };

    return (
       <>
            <h1>Hi {profile.username}!</h1>
            <h3>Your Photostream:</h3>

    
  <Container sx={{ py: 4 }} maxWidth="md" >  
    <Typography variant="h5" align="center" color="text.secondary" paragraph>
     You have got {photos.length} photos on your Stream
    </Typography> 

    <ImageListItem key="Subheader" cols={2}>
        {/* <ListSubheader component="div">Hey you have got {photos.length} photos on your Stream</ListSubheader> */}
      </ImageListItem>   
    <ImageList sx={{ width: 800, height: 675 }}>
      {photos.map((photo, index) => (
        <ImageListItem key={index}>
          <img
            src={`${photo.featured_image.url}?w=248&fit=crop&auto=format`}
            srcSet={`${photo.featured_image.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={photo.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={photo.title}
            subtitle={photo.body}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${photo.title}`}
                aria-label="delete" size="large"
                onClick={() => onDeletePhoto(photo)}
              >
                <DeleteIcon fontSize="inherit" />
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  </Container>


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

export { HomePage };