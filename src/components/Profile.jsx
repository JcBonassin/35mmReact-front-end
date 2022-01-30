import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';



function Profile({profile, history}) {

    // console.log(profile)

    return (
        <Container sx={{mt: '100px'}}>
            <Card sx={{ bgcolor: 'white', backgroundSize: 'cover', padding: '50px', border: '2px solid #222222'}}>
                <Grid container>
                    <Grid item xs={3} sx={{bgcolor: ''}}>
                        <Tooltip title='Change profile picture' placement='bottom' arrow>
                            <Avatar src={profile.avatar_url} onClick={() => history.push("/settings")} sx={{width: '200px', height: '200px', '&:hover': {cursor: 'pointer'}}}/>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={9}>
                        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <CardContent>
                            <Typography variant='h5' color='primery' sx={{ padding: '10px'}}>Your username: {profile.username}</Typography>
                            <Typography variant='h5' color='primery' sx={{ padding: '10px'}}>Your Email: {profile.email}</Typography>
                            {/* <Typography variant='h5' color='primery' sx={{ padding: '10px'}}>Your Password: {user.password_digest}</Typography> */}
                        </CardContent>
                            <Box sx={{flexGrow: 1}}></Box>
                            <Box sx={{padding: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <FavoriteIcon sx={{fontSize: '30px'}}/> &nbsp;&nbsp;<strong style={{fontSize: '20px'}}>{}</strong>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
            <br></br>
            <Card sx={{bgcolor: '#000000', padding: '20px', border: '2px solid #222222'}}>
                <CardContent sx={{flexGrow: 1}}>
                    {/* <Typography variant='h4' color='secondary'>{`Photos (${user.username})`}</Typography> */}
                </CardContent>
            </Card>
            {/* {userBeats.map(beat => { */}
                {/* let foundLike = likes.find(like => like.beat_id === beat.id) */}
                {/* return ( */}
                    <>
                        {/* <ProfileBeatCard user={user} beat={beat} foundLike={foundLike} handleLikeClick={handleLikeClick}/> */}
                    </>
                {/* ) */}
            {/* })} */}
        </Container>
    )
}

export { Profile }