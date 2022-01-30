import React, { useEffect, useState } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../helpers';
import { alertActions } from '../actions';
import { PrivateRoute } from '../components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { NavBar } from '../components';
import { Home } from '../components';
import { Upload } from '../components';
import { Profile } from '../components';
import { Stream35 } from '../components';
import { UserSettings } from '../components';
import { Blog } from '../components';
import { userService } from '../services';
import { PhotoProvider } from '../contexts'; 


function App() {
    
    const user = useSelector(state => state.authentication.user);
    const [ profile, setProfile] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        let cancel = false;
        userService.getUser().then((res) => {
            console.clear()
            if (cancel) return;
            setProfile(res);
          });
          return () => { 
            cancel = true;
          }
        }, []);

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);



    return (
            <>
                    
                    <Router history={history}>
                        <Switch>
                        <Route path="/login"  render={() => <LoginPage />} />
                        <Route path="/register" render={() => <RegisterPage />}/>
                        <Route exact={true} path="/35mm" render={() => <Home user={user} />} /> 
                        <> 
                            <PhotoProvider>
                            <NavBar profile={profile} setProfile={HomePage} user={user} />  
                            <PrivateRoute exact={true} path="/" render={() => <HomePage profile={profile} setProfile={setProfile} />}/>                          
                            <PrivateRoute exact={true} path="/upload" render={() => <Upload profile={profile} />} />
                            <PrivateRoute exact={true} path="/profile" render={() => <Profile profile={profile} history={history} />}  />
                            <PrivateRoute exact={true} path="/settings" render={() => <UserSettings profile={profile} setProfile={setProfile} />} />
                            <PrivateRoute exact={true} path="/explore" render={() => <Stream35 profile={profile} history={history} />} />
                            <PrivateRoute exact={true} path="/blog" render={() => <Blog profile={profile} />} />  
                            {/* <Redirect from="*" to="/"/>                              */}
                            </PhotoProvider>
                            </>
                        </Switch>       
                    </Router>
                   

        </>
    );
}

export { App };