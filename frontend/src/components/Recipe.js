import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import { ListItem, Button, Paper, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default class Recipe extends Component {
    constructor(props){
        super(props)
        this.state={
            recipes:[],
            open:false,
            openEdit:false,
            recipe_name:'',
            ingredients:'',
            instructions:'',
            category:'',
            notes:'',
            currentId:''
        }    
    }
    componentDidMount(){
        axios.get('/api/recipes').then(({data}) => {
            this.setState({recipes:data.recipes})
        }).catch((error)=>{
            console.log(error)
            });
    }
    
    handleSubmit=()=>{
        const{recipe_name,ingredients,instructions,notes,category}=this.state
        const myPram={
            recipe_name:recipe_name,
            ingredients:ingredients,
            instructions:instructions,
            category:category,
            notes:notes
        }
        console.log(myPram)
        axios.post('/api/recipes',myPram)
        .then(res=>{
            if(res.status == 201){
                this.setState({recipes:this.state.recipes},this.handleClose,)
                window.location.reload(); 
            }
            console.log(res)
        })
    }
    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
     };
    handleClose=()=>{
        this.setState({open:false})
        this.setState({openEdit:false})
        this.setState({currentId:''})
    }
    handleOpen=()=>{
        this.setState({open:true})
    }
    handleEdit=(e)=>{
        const id=e.currentTarget.value
        this.setState({currentId:id})
        axios.get(`/api/recipe/${id}`)
        .then(res =>{
            this.setState({
            recipe_name:res.data.recipe_name,
            ingredients:res.data.ingredients,
            instructions:res.data.instructions,
            category:res.data.category,
            notes:res.data.notes
            })
            console.log(res.data)
        })
        
        this.setState({openEdit:true})
    }
    handleUpdate=()=>{
        const{recipe_name,ingredients,instructions,notes,category,currentId}=this.state
        const myPram={
            id:currentId,
            recipe_name:recipe_name,
            ingredients:ingredients,
            instructions:instructions,
            category:category,
            notes:notes
        }
        axios.put(`/api/recipe/${currentId}`,myPram)
        .then(res=>{
            if(res.status == 200){
                this.setState({recipes:this.state.recipes},this.handleClose,)
                window.location.reload(); 
            }
            console.log(res)
        })
    }
    handleDelete=(e)=>{
        const id=e.currentTarget.value
        axios.delete(`/api/recipe/${id}`)
        .then(res=>{
            console.log(res)
            if(res.status == 200){
            this.setState({recipes:this.state.recipes})
            window.location.reload(); 
            console.log('deleted')}
        })
    }
    
    render() {
        const{recipes,open,openEdit,recipe_name,ingredients,instructions,notes,category}=this.state
        console.log(recipes)
        return (
            <React.Fragment>
                <Container fixed>
                    <Paper>
                        <Button variant="contained" onClick={this.handleOpen}>Add</Button>
                    </Paper>
                    <Paper>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Ingredients</TableCell>
                                        <TableCell align="right">Instructions</TableCell>
                                        <TableCell align="right">Category</TableCell>
                                        <TableCell align="right">Notes</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {recipes.map((recipe)=> ( 
                                    <TableRow key={recipe.id}>
                                    <TableCell component="th" scope="row">
                                        {recipe.recipe_name}
                                    </TableCell>
                                    <TableCell align="right">{recipe.ingredients}</TableCell>
                                    <TableCell align="right">{recipe.instructions}</TableCell>
                                    <TableCell align="right">{recipe.category}</TableCell>
                                    <TableCell align="right">{recipe.notes}</TableCell>
                                    <TableCell align="right"><Button variant="contained" value={recipe.id} onClick={this.handleEdit}>Edit</Button></TableCell>
                                    <TableCell align="right"><Button variant="contained" value={recipe.id} onClick={this.handleDelete}>Delete</Button></TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Add Recipe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Add Recipe with ingredients, instrtuctions and category
                            </DialogContentText>
                            
                            <TextField autoFocus margin="dense" name="recipe_name" id="recipe_name" label="Recipe Name" type="text" fullWidth value={recipe_name}
                                onChange={this.handleChange} />
                            <TextField autoFocus multiline margin="dense" name="ingredients" id="ingredients" label="Ingredients" type="text" fullWidth value={ingredients}
                                onChange={this.handleChange} />
                            <TextField autoFocus multiline margin="dense" name="instructions" id="instructions" label="Instructions" type="text" fullWidth value={instructions}
                                onChange={this.handleChange} />
                            <TextField autoFocus multiline margin="dense" id="category" name="category" label="Category" type="text" fullWidth value={category}
                                onChange={this.handleChange} />
                            <TextField autoFocus multiline margin="dense" name="notes" id="notes" label="Notes" type="text" fullWidth value={notes}
                                onChange={this.handleChange} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleSubmit} color="primary">
                                Add
                            </Button>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={openEdit} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit Recipe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                               Edit Recipe details
                            </DialogContentText>
                            <TextField autoFocus margin="dense" name="recipe_name" id="recipe_name" label="Recipe Name" type="text" fullWidth value={recipe_name}
                                onChange={this.handleChange} />
                            <TextField autoFocus multiline margin="dense" name="ingredients" id="ingredients" label="Ingredients" type="text" fullWidth value={ingredients}
                                onChange={this.handleChange} />
                            <TextField autoFocus multiline margin="dense" name="instructions" id="instructions" label="Instructions" type="text" fullWidth value={instructions}
                                onChange={this.handleChange} />
                            <TextField autoFocus multiline margin="dense" id="category" name="category" label="Category" type="text" fullWidth value={category}
                                onChange={this.handleChange} />
                            <TextField autoFocus multiline margin="dense" name="notes" id="notes" label="Notes" type="text" fullWidth value={notes}
                                onChange={this.handleChange} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleUpdate} color="primary">
                                Edit
                            </Button>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </React.Fragment>
        )
    }
}
