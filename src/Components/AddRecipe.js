import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { recipesContext } from '../App';
import { useContext } from 'react';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function AddRecipe() {


    const classes = useStyles();
    const history = useHistory();

    const { register, handleSubmit, formState: { errors } } = useForm();


    const onSubmitValue = (data) => {
        data.hide = false;
        data.ingredientsValue = false;
        data.ingredients = data.ingredients.split(',');
        axios.post("https://recipe-by-gowtham.herokuapp.com/recipe/add", { ...data }).then((res) => dispatch({
            type: "ADD-RECIPE",
            payload: res.data
        }))

        history.push('/')
    }

    const { dispatch } = useContext(recipesContext);

    return (
        <div className={classes}>
            <Typography variant="h4" style={{ textAlign: 'center' }} gutterBottom>
                Add Recipe
            </Typography>
            <Container maxWidth="sm">
                <form onSubmit={handleSubmit(onSubmitValue)} >
                    <div className="form-group">
                        <label className="label">Recipe Title</label>
                        <input
                            {...register("title", { required: true })}
                            type="text" placeholder="Title" className="form-control" id="exampleFormControlInput1"
                        />
                        {errors.title && errors.title.type === "required" && (<span className="warning">Title is required</span>)}

                    </div>
                    <div className="form-group">
                        <label className="label">Recipe Image</label>
                        <input
                            {...register("image", { required: true })}
                            type="text" placeholder="Image url link" className="form-control"
                        />
                        {errors.image && errors.image.type === "required" && (<span className="warning">Image url is required</span>)}
                    </div>
                    <div className="form-group">
                        <label className="label">Cooking Procedure</label>
                        <textarea
                            {...register("procedure", { required: true })}
                            className="form-control" placeholder="Procedure to cook" name="procedure" id="exampleFormControlTextarea1" rows="3">
                        </textarea>
                        {errors.procedure && errors.procedure.type === "required" && (<span className="warning">Procedure is required</span>)}

                    </div>
                    <div className="form-group">
                        <label className="label">Recipe Ingredients</label>
                        <textarea
                            {...register("ingredients", { required: true })}
                            className="form-control" placeholder="Ingredients" id="exampleFormControlTextarea1" rows="3">
                        </textarea>
                        {errors.ingredients && errors.ingredients.type === "required" && (<span className="warning">Ingredients is required</span>)}
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

export { AddRecipe };