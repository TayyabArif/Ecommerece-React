// import React from "react";
// import { GoogleAPI, GoogleLogin, GoogleLogout } from "react-google-oauth";
// import FacebookLogin from 'react-facebook-login';

// function Oauthtest(){

// const onSuccess = (response) => {
//     console.log( "I AM RESPONSE FROM GOOGLE",response)
//     var token = response;
//     var data = {
//       provider: "google_oauth2",
//       uid: token.Ca,
//       id_token: response.wc.id_token,
//       info: {
//         email: token.nt.Wt
//       }
//     }
//     console.log(data, "MY USER OBJECT I WANT TO SEND TO THE BACKEND")
// //     const requestOptions = {
// //       method: 'POST',
// //       headers: {
// //         'Authorization': `Bearer ${response.wc.access_token}`,
// //         'Content-Type': 'application/json',
// //         'access_token': `${response.wc.access_token}`
// //       },
// //       body: JSON.stringify(data)
// //     }
// //     return fetch(`call back url set in the backend`, requestOptions)
// //     .then(response => response.json())
// //     .then(response => {
// //       console.log(response,  "I AM  RESPONSE FROM THE BACKEND");
// //       // do something
// //   })
// //     .catch(err=>console.log(err))
//   }
//   return (
//     <div className="App">
//       <div className="App-header">
        
//         <GoogleAPI className="GoogleLogin" clientId={"291632242555-8ng3ei11qd69o9jfel3erhvut7n1avm6.apps.googleusercontent.com"}>
//             <GoogleLogin
//               height="10"
//               width="500px"
//               backgroundColor="#4285f4"
//               clientId={"291632242555-8ng3ei11qd69o9jfel3erhvut7n1avm6.apps.googleusercontent.com"}
//               access="offline"
//               scope="email profile"
//               onSuccess={onSuccess}
//               onFailure={onSuccess}
//             />
//         </GoogleAPI>
//       </div>
//     </div>
//   );
// }

// export default Oauthtest;


import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useDispatch, useSelector } from "react-redux";
import { oauthUser } from '../redux/actions/actions';

function Oauthtest() {
    const [ profile, setProfile ] = useState([]);
    const dispatch = useDispatch();
    const clientId = '291632242555-8ng3ei11qd69o9jfel3erhvut7n1avm6.apps.googleusercontent.com';
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res) => {
        console.log("response", res)
         setProfile(res.profileObj);
         var token = res;
        const provider= "google_oauth2"
        const uid= token.Ca
        const id_token= token.tokenObj.id_token
        // const email= token.profileObj.email
        const info= {
        email: token.profileObj.email,
        zip_code: 1212
      }
      const data= JSON.stringify({profile: {uid, id_token, provider, info}})
      dispatch(oauthUser(data))
    }
    const onFailure = (err) => {
        console.log('failed', err);
    };

    const logOut = () => {
        setProfile(null);
    };

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.imageUrl} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
                </div>
            ) : (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            )}
        </div>
    );
}

export default Oauthtest;
