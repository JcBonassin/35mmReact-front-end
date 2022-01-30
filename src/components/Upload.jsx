import React, { useState, useContext } from "react";
import { userService } from '../services';
import { history } from '../helpers';
import { PhotoContext, PhotoDispatchContext } from '../contexts';
import { DropzoneArea } from "mui-file-dropzone";
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';



function Upload()  {

    const [ title, setTitle ] = useState('')
    const [ body, setBody ]  = useState('')
    const [ featured_image, setFeatured] = useState({ featured_image: null })  

    const photos = useContext(PhotoContext)
    const setPhotos = useContext(PhotoDispatchContext)

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', body);
      formData.append('featured_image', featured_image);
      userService.createPhoto(formData).then(
        (response) => {
          console.log(response)
          setPhotos(photos.concat(response))
          history.push("/")
        });  
      };

      
return (

        <>
    
 <h1> Upload a new Photo</h1>

  <form onSubmit={handleSubmit}>
    <DropzoneArea
     clearOnUnmount={true}
     onAdd={(fileObjs) => console.log('Added Files:', fileObjs)}
     showFileNamesInPreview={true}
     showAlerts={true}
     maxFileSize={50000000}
     onDelete={(fileObj) => console.log('Removed File:', fileObj)}
     onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
     multiple="false"
     onDrop={console.log}
     accept="image/*"
     type="file"
     onChange={file => setFeatured(file[0])}
     />  

      <h3>Add a title</h3>
      <TextField
        name="title"
        required
        fullWidth
        id="Title"
        autoFocus
        type="text" 
        value={title} 
        onChange={ (e) => setTitle(e.target.value)} 
        id="outlined-basic"
        label="title"
        variant="outlined"
        autoComplete="false"    
        />
        
        <h3>Speak your Mind</h3>
        <TextField
          name="body"
          type="text"
          required
          fullWidth
          id="Body"
          id="outlined-basic"
          label="Add description"
          variant="outlined"
          rows="3"
          multiline
          value={body}
          onChange={ (e) => setBody(e.target.value)} 
        />

        <Button variant="contained" color="primary" type="submit" >
            Upload
        </Button>
   </form>
</>         
      );
}
  
export { Upload }
