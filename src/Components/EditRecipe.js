import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';
import { recipesContext } from '../App';
import axios from 'axios';
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function EditRecipe() {

    const { id } = useParams();
    const classes = useStyles();
    const history = useHistory();
    const { state, dispatch } = useContext(recipesContext);
    const recipe = state.find((recipe) => recipe._id === id);
    const [title, setTitle] = useState(recipe.title);
    const [image, setImage] = useState(recipe.image);
    const [procedure, setProcedure] = useState(recipe.procedure);
    const [ingredients, setIngredients] = useState(recipe.ingredients.join(','));

    const onSubmitValue = (e) => {
        e.preventDefault();
        recipe.title = title;
        recipe.procedure = procedure;
        recipe.ingredients = ingredients.split(',');
        recipe.image = image;
        axios.patch(`https://recipe-by-gowtham.herokuapp.com/recipe/update/${recipe._id}`, { ...recipe }).then((res) => {
            dispatch({
                type: "EDIT-RECIPE",
                payload: res.data
            })
        })
        history.push('/')
    }

    return (
        <div className={classes}>
            <IconButton onClick={() => { history.goBack() }}>
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" style={{ textAlign: 'center' }} gutterBottom>
                Edit Recipe
            </Typography>
            <Container maxWidth="sm">
                <form onSubmit={(e) => ((onSubmitValue(e)))} >
                    <div className="form-group">
                        <label className="label">Recipe Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text" placeholder="Title" className="form-control" id="exampleFormControlInput1"
                        />
                        {!title && (<span className="warning">Title is required</span>)}

                    </div>
                    <div className="form-group">
                        <label className="label">Recipe Image</label>
                        <input
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            type="text" placeholder="Image url link" className="form-control"
                        />
                        {!image && (<span className="warning">Image url is required</span>)}
                    </div>
                    <div className="form-group">
                        <label className="label">Cooking Procedure</label>
                        <textarea
                            value={procedure}
                            onChange={(e) => setProcedure(e.target.value)}
                            className="form-control" placeholder="Procedure to cook" name="procedure" id="exampleFormControlTextarea1" rows="3">
                        </textarea>
                        {!procedure && (<span className="warning">Procedure is required</span>)}

                    </div>
                    <div className="form-group">
                        <label className="label">Recipe Ingredients</label>
                        <textarea
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            className="form-control" placeholder="Ingredients" id="exampleFormControlTextarea1" rows="3">
                        </textarea>
                        {!ingredients && (<span className="warning">Ingredients is required</span>)}
                        <p style={{ color: '#7852ff' }}>!!! While Entering the recipe ingredients separate each by comma </p>
                    </div>
                    <Button variant="contained" type="submit" color="primary">
                        Submit
                    </Button>
                </form>
            </Container>
        </div>
    )
}

export { EditRecipe };