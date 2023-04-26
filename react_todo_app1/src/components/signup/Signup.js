import React from 'react'
import {Grid, Paper, Avatar, TextField, Button} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import './css/Signup.css'
import axios from 'axios';
import { Link, Route, Switch, useNavigate } from 'react-router-dom';



const Signup=()=>{
    const paperStyle={padding:20,height:'70vh',width:300,margin:"20px auto"}
    const avatarStyle={backgroundColor:'#006d5b'}
    // eslint-disable-next-line react-hooks/rules-of-hooks

    function handleClick() {
        let email=document.getElementById("email-field").value
        let password=document.getElementById("password-field").value

    console.log(email,password);
          axios.post('http://127.0.0.1:8000/api/register/', {
    email: email /* get the username value from your form */,
    password: password /* get the password value from your form */
  })
  .then((response) => {
      console.log(true)
      alert('User Created Successfully !')
      document.getElementById("email-field").value = "";
      document.getElementById("password-field").value = "";
    /* handle success response */
  })
  .catch((error) => {
      console.log(false)
      alert("Email already found !");
      document.getElementById("email-field").value = "";
      document.getElementById("password-field").value = "";
    /* handle error response */
  });
  }

    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2 id="heading" >Sign Up</h2>
                    <TextField id="email-field" label="Email"  placeholder={"Enter Email"} fullWidth required />
                    <TextField id="password-field" label="Password"  placeholder={"Enter Password"} type={'password'} fullWidth required />

                    {/*<Grid style={{display:"flex",flexDirection:"row",marginTop:"12px"}}>*/}
                    {/*<Button id="signup-page-create-button" type={'submit'} variant="contained" color={'primary'} fullWidth onClick={handleLogin}>Create account</Button>*/}
                    <Button id="signup-page-create-button" type={'submit'} variant="contained" onClick={handleClick} color={'primary'} fullWidth >Create account</Button>
                    <p>or</p>

                    <Link to='/'>
                        <Button id="signup-page-login-button"  type={'submit'} variant="contained" color={'primary'} >Login</Button>
                    </Link>


                </Grid>

                {/*</Grid>*/}
            </Paper>
        </Grid>
    )
}
export default Signup;