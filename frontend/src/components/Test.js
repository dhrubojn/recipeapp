
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import { ListItem, Button, Paper, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { GlobalContext } from '../context/GlobalState';
import { Link } from 'react-router-dom';

export default function Recipelist() {
    const { recipies, removeRecipe, editRecipe } = useContext(GlobalContext);
    console.log(recipies)
    return(
        <div>
            <React.Fragment>
                <Container fixed>
                    <Paper>
                        <Button variant="contained" >Add</Button>
                    </Paper>
                    <Paper>
                        <List>
                            {recipies.map((recipe)=>{
                                return (  <ListItem key={recipe.id}>{recipe.recipe_name}
                                <Button variant="contained" value={recipe.id} onClick={() => editRecipe(recipe.id)}>Edit</Button>
                                <Button variant="contained" value={recipe.id} onClick={() => removeRecipe(recipe.id)}>Delete</Button></ListItem>)
                            })}    
                        </List>
                    </Paper>
                    <Dialog  aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To subscribe to this website, please enter your email address here. We will send updates
                                occasionally.
                            </DialogContentText>
                            <TextField autoFocus margin="dense" name="name" id="name" label="Recipe Name" type="text" fullWidth 
                                />
                            <TextField autoFocus multiline margin="dense" name="ingredient" id="ingredient" label="Ingredient" type="text" fullWidth 
                                />
                            <TextField autoFocus multiline margin="dense" name="instruction" id="instruction" label="Instruction" type="text" fullWidth 
                                />
                            <TextField autoFocus multiline margin="dense" id="category" name="category" label="Category" type="text" fullWidth 
                                />
                            <TextField autoFocus multiline margin="dense" name="note" id="note" label="Note" type="text" fullWidth 
                                />
                        </DialogContent>
                        <DialogActions>
                            <Button  color="primary">
                                Add
                            </Button>
                            <Button color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To subscribe to this website, please enter your email address here. We will send updates
                                occasionally.
                            </DialogContentText>
                            <TextField autoFocus margin="dense" name="name" id="name" label="Recipe Name" type="text" fullWidth 
                                 />
                            <TextField autoFocus multiline margin="dense" name="ingredient" id="ingredient" label="Ingredient" type="text" fullWidth 
                                 />
                            <TextField autoFocus multiline margin="dense" name="instruction" id="instruction" label="Instruction" type="text" fullWidth 
                                />
                            <TextField autoFocus multiline margin="dense" id="category" name="category" label="Category" type="text" fullWidth 
                                 />
                            <TextField autoFocus multiline margin="dense" name="note" id="note" label="Note" type="text" fullWidth 
                                 />
                        </DialogContent>
                        <DialogActions>
                            <Button  color="primary">
                                Add
                            </Button>
                            <Button  color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </React.Fragment>
        </div>
    )
}
