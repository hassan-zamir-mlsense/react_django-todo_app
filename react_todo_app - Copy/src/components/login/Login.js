import {React,useState,useEffect } from 'react'
import {Grid, Paper, Avatar, TextField, Button} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import './css/Login.css'
import { Link, Route, Switch, useNavigate,useHistory,Redirect } from 'react-router-dom';
import {useCookies} from 'react-cookie'
import APIService from './APIService'
import axios from 'axios';
// import { useSelector } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';
import {GoogleLogin,GoogleLogout} from "react-google-login";
import jwt_decode from 'jwt-decode';
import {gapi} from "gapi-script";

import Signup from "../signup/Signup";
// Add this in your component file
require('react-dom');


const Login=()=>{
    const paperStyle={padding:20,height:'70vh',width:300,margin:"20px auto"}
    const avatarStyle={backgroundColor:'#006d5b'}
    const login_url="http://127.0.0.1:8000/api/login/";
    const backendRoot="http://127.0.0.1:8000";
    const google_client_id="59866668171-8f6ta9ovr16dojfb9uagl65l1u1vd8ud.apps.googleusercontent.com";

    /////////////////////////////////////////////////////////////////////////////////////////





    // function Login_cookies() {
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [token, setToken] = useCookies(['mytoken'])
        let navigate = useNavigate()
        const [validate, setValidate] = useState(false);
        // const [isLoggedIn, setIsLoggedIn] = useState(true);
        var isLoggedIn = false;




        useEffect(() => {
            var user_token = token['mytoken']
            console.log('Login User token is', user_token)
            console.log('Data type', typeof (token['mytoken']))

            if (String(user_token) === 'undefined') {
                navigate('/')
            } else {
                navigate('/articles')
            }

        }, [token])

        function validateForm() {
        return email.length > 0 && password.length > 0;
      }

        const loginBtn = () => {
            if (email.trim().length !== 0 && password.trim().length) {
            //     console.log('Username And Password Are Set')
            // let email=document.getElementById("email-field").value
            // let password=document.getElementById("password-field").value
            let resp_ = APIService.LoginUser({
                // "username":"admin_5@gmail.com",
                // "password":"123"
                email,password
            })
            console.log(resp_)
            .then(resp => setToken('mytoken', resp.token))
            .catch(error => console.log(error))
            } else {
                console.log('Username And Password Are Not Set')
                navigate('/')
            }
        }


        const RegisterBtn = () => {
            if (email.trim().length !== 0 && password.trim().length !== 0) {
                console.log('Username and password are set');
                APIService.RegisterUser({email, password})
                    .then(() => loginBtn())
                    .catch(error => console(error))
            } else {
                navigate('/')
                console.log('Username and password are not set');

            }
        }


        const loginStyle = {
            backgroundImage: `url(${process.env.PUBLIC_URL + "img/18.jpg"})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            'min-height': '100%',
            height: '77vh',
            backgroundPosition: ' center',
            margin: 0,
        };

    // }
    //////////////////////////



function validate_login() {
        return ;
      }



    async function loginUser( ) {

        axios.post(login_url, {
            // email,password
                "username":email,
                  "password":password
    // email: email /* get the username value from your form */,
    // password: password /* get the password value from your form */
  })
  .then((response) => {
      console.log(response.data['access'])
      console.log('Login Success')
      navigate('/notes')
      // alert('User Created Successfully !')

    let access_token=response.data['access']
      localStorage.setItem('access_token', access_token);
      console.log(localStorage)
      // isLoggedIn=true;
    /* handle success response */
  })
  .catch((error) => {
      console.log(false)
      alert("Invalid Credentials !");

    /* handle error response */
  });
        // eslint-disable-next-line react-hooks/rules-of-hooks


      // const response = await fetch('http://127.0.0.1:8000/api/login/', {
      //
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //       // email,password
      //     "username":"admin_5@gmail.com",
      //     "password":"123"
      //   })
      // });
      // // console.log(response)
      // if (response.ok) {
      //     console.log('--Res--',response)
      //     const { token } = await response.data;
      //     console.log(token)
      //     localStorage.setItem('token', token);
      // // localStorage.setItem('token', response["access"]);
      //
      // }
      // if (!response.ok) {
      //   const error = await response.json();
      //   throw new Error(error.detail);
      // }


    }


   //  const [showComponent, setShowComponent] = useState(false);
   //      const navigate = useNavigate();
   //
   // const someEventHandler = () => {
   //     navigate('/some-route');
   // }

    //---------------------------------------------------------
    // GOOGLE AUTHENTICATION

    useEffect(() => {
    function start() {
        gapi.client.init({
            clientId: google_client_id,
            scope: ""
        })
    };
    gapi.load('client:auth2', start)

    });

    const google_login_success = (res) => {
        console.log("Login Success! Current user: ",res.profileObj);
        let email_address=res.profileObj['email']

        // Getting JWT access token on the behalf of Google Authentication
        axios.post(login_url, {
                "username":"admin",
                  "password":"admin"
  })
  .then((response) => {
      navigate('/notes')

    let access_token=response.data['access']
      localStorage.setItem('access_token', access_token);
      navigate('/notes')
      console.log(email_address)

    axios.post('http://127.0.0.1:8000/api/register/', {
        "email": email_address,
        "password": "123"
      })
      .then((response) => {
          alert('User Created Successfully !')
      })
      .catch((error) => {
          alert("Email already found !");
      });






  })
    }

    const google_login_failure = (res) => {
        console.log("Login Failed! res: ",res);
    }
    const google_logout_success = (res) => {
        console.log("Logout successful");
    }

    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2 id="heading" >Log In</h2>
                    <TextField id="email-field" label="Email" placeholder={"Enter Email"}  fullWidth required onChange ={e=> setEmail(e.target.value)}/>
                    <TextField id="password-field" label="Password" placeholder={"Enter Password"} type={'password'} fullWidth required onChange ={e=> setPassword(e.target.value)}/>

                    {/*disabled={!validateForm()}*/}
                    {/*<Link to={isLoggedIn==true ? '/notes' : '/'}>*/}
                    <Link >
                        <Button id="login-page-login-button"  type={'submit'} variant="contained" color={'primary'} fullWidth onClick={loginUser}>Login</Button>
                    </Link>

                    <p>or</p>

                    <Link to='/signup'>
                        <Button id="login-page-create-button" type={'submit'} variant="contained" color={'primary'} >Create account</Button>
                    </Link>

                    {/*<GoogleOAuthProvider clientId="59866668171-8f6ta9ovr16dojfb9uagl65l1u1vd8ud.apps.googleusercontent.com">*/}
                    {/*    <GoogleLogin onSuccess={credentialResponse => {*/}
                    {/*        const details = jwt_decode(credentialResponse.credential);*/}
                    {/*        const email_address=details.email*/}
                    {/*        document.getElementById("email-field").value = email_address;*/}
                    {/*        console.log(email_address)*/}
                    {/*        // console.log(details);*/}
                    {/*        // console.log(credentialResponse);*/}
                    {/*    }}*/}
                    {/*     onError={()=>{*/}
                    {/*         console.log('Login Failed')*/}
                    {/*     }}*/}
                    {/*     />*/}
                    {/*</GoogleOAuthProvider>*/}

                    <p></p>

                    <div id="signin_button">
                        <GoogleLogin
                            clientId={google_client_id}

                            buttonText="Login"
                            onSuccess={google_login_success}
                            onFailure={google_login_failure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                         />
                    </div>



                    {/*<Button href={`${backendRoot}/accounts/google/login/?process=login`} variant="contained" color={'secondary'}>*/}
                    {/*    Login with Google*/}
                    {/*</Button>*/}

                    {/*<div id="signOutButton">*/}
                    {/*    <GoogleLogout*/}
                    {/*        clientId={google_client_id}*/}
                    {/*        buttonText={"Logout"}*/}
                    {/*        onLogoutSuccess={google_logout_success}*/}
                    {/*    />*/}
                    {/*</div>*/}


                </Grid>
            </Paper>
        </Grid>
    )
}

export default Login;