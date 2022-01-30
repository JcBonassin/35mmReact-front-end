import React, { useState, useEffect} from "react";
import { userService } from '../services';
import { DropzoneArea } from "mui-file-dropzone";
import { history } from '../helpers';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

function UserSettings({setProfile}) {

    const [ username, setUsername ] = useState('')
    const [ avatar_url, setAvatarUrl ] = useState({ avatar_url: null })
    const [ image, setImage ] = useState(null)
    const [ email, setEmail ] = useState('')
    const [ id, setId ] = useState('')
     // console.log(user)

    
       useEffect(() => {
        let cancel = false;
        userService.getUser().then((res) => {
            if (cancel) return;
            setUsername(res.username);
          });
          return () => { 
            cancel = true;
          }
        }, []);

      useEffect(() => {
          let cancel = false;
          userService.getUser().then((res) => {
              if (cancel) return;
              setEmail(res.email);
            });
            return () => { 
              cancel = true;
            }
          }, []);

     useEffect(() => {
         let cancel = false;
         userService.getUser().then((res) => {
             if (cancel) return;
             setId(res.id);
           });
           return () => { 
             cancel = true;
           }
         }, []);

 
    function handleImageUpload(e){
         e.preventDefault()
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', 'xbievufe')
        userService.imageUpload(formData).then(
        (response) => {
          console.log(response)
          setAvatarUrl(response.url)
        })

    }


    const handleEditProfile = (e) => {
        e.preventDefault()
        const profileObj = {
            username: username,
            email: email,
            id: id,
            avatar_url: avatar_url
        }
        userService.update(profileObj).then(
            (response) => {
            //   console.log(response)
              setProfile(response)
            //   window.location.reload()
              history.push("/Profile")
            });     
    }


    return (
        <Container sx={{mt: '100px', height: '100vh'}}>
            <Box sx={{display: 'flex', justifyContent: 'center', mb: '20px', padding: '20px'}}>
                <Typography variant='h3'>Your Profile Settings</Typography>
            </Box>
            <Divider sx={{bgcolor: '#222222'}}/>
            <Grid container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Grid item xs={12} sx={{width: '50%'}}>
                    <form autoComplete='off'>
                        <Typography variant='h5' sx={{mt: '20px', mb: '10px', paddingTop: '20px'}}><strong>Username</strong></Typography>
                        <TextField required variant="outlined" color='primary' value={username ?? ""} onChange={(e) => setUsername(e.target.value)} sx={{bgcolor: 'white', color: '#777777', width: '100%', mt: '20px', mb: '10px'}}/>

                        <Typography variant='h5' sx={{mt: '20px', mb: '10px', paddingTop: '20px'}}><strong>Email</strong></Typography>
                        <TextField required variant="outlined" color='primary' value={email ?? ""} onChange={(e) => setEmail(e.target.value)} sx={{bgcolor: 'white', color: '#777777', width: '100%', mt: '20px', mb: '10px'}}/>

                    </form>
                    <form autoComplete='off' onSubmit={handleImageUpload} >
                    <Typography variant='h5' sx={{mb: '10px', paddingTop: '20px'}}><strong>Profile Picture</strong></Typography>
                    <DropzoneArea
                         clearOnUnmount={true}
                         onAdd={(fileObjs) => console.log('Added Files:', fileObjs)}
                         showFileNamesInPreview={true}
                         maxFileSize={50000000}
                         onDelete={(fileObj) => console.log('Removed File:', fileObj)}
                         onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
                         multiple="false"
                         onDrop={console.log}
                         accept="image/*"
                         type="file"
                         onChange={file => setImage(file[0])}
   
                        />
                        {image ? 
                        <Button type='submit' variant='contained' sx={{mt: '20px', width: '25%'}}><strong>Upload Image</strong></Button> 
                        : 
                        null
                        }
                    </form> 
                    <form onSubmit={handleEditProfile} autoComplete='off'>
                        <br></br>
                        <Button type='submit' variant='contained' sx={{mt: '20px', width: '100%', padding: '20px'}}><strong>Save Changes</strong></Button>
                    </form>
                </Grid>
                {/* {(errors.length > 0) ? */}
                    <Box sx={{mt: '20px', mb: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    {/* {errors.map(error => <Typography key={error} color='error'>{error}</Typography>)} */}
                    </Box>
                    {/* : */}
                    {/* null */}
                {/* } */}
            </Grid>
        </Container>
    )
}

export { UserSettings }
