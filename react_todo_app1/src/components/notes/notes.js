import React, { useState,useRef,useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import AppBar from '@mui/material/AppBar';
import { Add as AddIcon, Delete as DeleteIcon,Edit,Save } from '@material-ui/icons'
// import { getToken } from '../services/LocalStorageService';
import EditIcon from '@mui/icons-material/Edit';
import {GoogleLogout} from "react-google-login";
import {useNavigate} from "react-router-dom";

// import TextField from '@mui/material/TextField';

const main_url= "http://127.0.0.1:8000";

const Notes=()=> {
    let navigate = useNavigate()
    let [notes, setNotes] = useState([]);
    let [notes_indexes_list, set_notes_indexes] = useState([]);
    let [zipped_list, set_zipped_list] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [textInput, setTextInput] = useState('');
    var notes_with_indexes_list=[];
    const access_token___=localStorage['access_token']
    // console.log('Notes here',access_token___)
    const auth_token = {headers:{'Authorization': `Bearer ${access_token___}`}}
    const google_client_id="59866668171-8f6ta9ovr16dojfb9uagl65l1u1vd8ud.apps.googleusercontent.com";


  useEffect(() => {
    handleReadNotes()
  }, []); // 👈️ empty dependencies array



  const handleAddNote = () => {
    setNotes([...notes, newNote]);
    console.log(notes,newNote);
    setNewNote('');

    // Creating new Note in Database
    axios.post(main_url+'/task-create/', {
                "description":newNote
  },auth_token)
  .then((response) => {
      // console.log(response.data['access'])
    console.log(true,response.data)
  })
  .catch((error) => {
    console.log(false)
  });


  };

  function handleReadNotes() {
    // Reading Notes from Database
    axios.get(main_url+'/task-list/',auth_token)

  .then((response) => {

    let notes_response;
    notes_response=response.data

    var temp_notes_list=[]
    var temp_indexes_list=[]
    for (let i = 0; i < notes_response.length; i++) {
      let n =notes_response[i]['description']
      let temp_index =notes_response[i]['id']

      temp_notes_list.push(n)
      temp_indexes_list.push(temp_index)

      notes_with_indexes_list.push([n,temp_index])
}
    // Updating the Notes
    setNotes(temp_notes_list)

    // Updating the Indexes list
    set_notes_indexes(temp_indexes_list)

    set_zipped_list(notes_with_indexes_list)

    // console.log(zip_data_of_lists)
    // set_zipped_list(zip_data_of_lists)
    // console.log(true,zipped_list,true)
  })
  .catch((error) => {
    console.log('Error Notes not updated !!!')
  });
  }
  
  const handleDeleteNote = (index,primary_key) => {
    setNotes(notes.filter((note, i) => i !== index));
    console.log('Note Deleted!')


    // Deleting notes from Database
    axios.get(main_url+'/task-delete/'+primary_key+'/',auth_token)
  .then((response) => {
      // console.log(response.data['access'])
    // console.log(true,response.data)
  })
  .catch((error) => {
    // console.log(false)
    // alert("Invalid Credentials !");
  });
  };

  // const [value, setValue] = useState('initial value'); // initialize state with initial value
  const handleSaveNote = (primary_key,value) => {
    // Deleting notes from Database
    axios.post(main_url+'/task-update/'+primary_key+'/',{
                "description":value
  },auth_token)
  .then((response) => {
      ////
  })
  .catch((error) => {
    ///
  });

    console.log('save button',primary_key,value)
  };

  // This function will the update the changed text in a note
  const handleTextInputChange = event => {
        setTextInput(event.target.value);
        // console.log(event.target.value)
    };

  // --------------------------------
  // GOOGLE AUTHENTICATION
    const google_logout_success = (res) => {
      console.log("Logout successful");
      navigate('/')
  }

  return (

        <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Note App
      </Typography>


      <div id="signOutButton">
        <GoogleLogout
            clientId={google_client_id}
            buttonText={"Logout"}
            onLogoutSuccess={google_logout_success}
        />
      </div>


      <Paper elevation={3} style={{ padding: '16px' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              label="New Note"
              fullWidth
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              fullWidth
              onClick={handleAddNote}
              disabled={!newNote.trim()}
            >
              Add Note
            </Button>
          </Grid>
        </Grid>
        <List >
          {/*{notes.map((note, index) => (*/}
          {/*{var zipped = arr1.map((x, i) => [x, arr2[i]])};*/}
          {/*{console.log(notes_indexes_list)};*/}
          {notes.map((note, index) => (

            <ListItem key={note}>
              {/*{console.log(notes)}*/}
              <TextField
                  id='note-field'
                  defaultValue={note}
                  onChange= {handleTextInputChange}
              />
              {/*<ListItemText primary={note} />*/}
              <ListItemSecondaryAction>
                <IconButton onClick={() => handleSaveNote(notes_indexes_list[index],textInput)}>
                  <Save />
                </IconButton>
                <IconButton onClick={() => handleDeleteNote(index,notes_indexes_list[index])}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}

        </List>
      </Paper>
    </Container>
    );
}


export default Notes;