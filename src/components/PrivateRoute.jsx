import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute( {path, exact, render} ) {  
    if (!localStorage.getItem('user')) { 
        return <Redirect from="*" to='/35mm'/>   
    } else {   
        return <Route exact={exact} path={path} render={render} />  
    } }

export { PrivateRoute };