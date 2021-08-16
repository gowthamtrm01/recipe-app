import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router';
import { useContext } from "react";
import { recipesContext } from "../App";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));


function CardComponent({ recipe, index }) {

  const classes = useStyles();

  function onClickIngredients() {
    if (recipe.ingredientsValue === false) {
      const foundRecipe = state.find(
        (item) => item._id === recipe._id
      );
      foundRecipe.ingredientsValue = true;
      dispatch({
        type: "INGREDIENTS-DROP-DOWN",
        payload: foundRecipe
      })
    } else if (recipe.ingredientsValue === true) {
      const foundRecipe = state.find(
        (item) => item._id === recipe._id
      );
      foundRecipe.ingredientsValue = false;
      dispatch({
        type: "INGREDIENTS-DROP-UP",
        payload: foundRecipe
      })
    }
  }

  const history = useHistory();
  const { state, dispatch } = useContext(recipesContext);

  return (
    <div style={{ display: "inline-flex", margin: "10px" }}>
      <Card className={classes.root} key={index}>
        <CardMedia
          style={{ width: '300px' }}
          className={classes.media}
          image={recipe.image}
          title={recipe.title}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom color="textSecondary" component="p">
            {recipe.title}
            <IconButton
              onClick={() => { history.push(`/edit/${recipe._id}`) }}
            >
              <EditIcon />
            </IconButton>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="delete"
            style={{ margin: '0 10px' }}
            onClick={() => {
              axios.delete(`https://recipe-by-gowtham.herokuapp.com/recipe/delete/${recipe._id}`).then((res) => dispatch({
                type: "DELETE-RECIPE",
                id: res._id
              }))
            }}
          >
            <DeleteIcon />
          </IconButton>
          <Button
            onClick={() => { history.push(`/learnmore/${recipe._id}`) }}
            variant="contained" color="primary">
            Learn more
          </Button>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: recipe.ingredientsValue
            })}
            onClick={() => { onClickIngredients() }}
            aria-expanded={recipe.ingredientsValue}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={recipe.ingredientsValue} timeout="auto" unmountOnExit>
          <CardContent>
            <div>
              <h4 style={{ fontFamily: "bold" }}>Ingredients</h4>
              <ul className="list-group">
                {recipe.ingredients.map((ingredient, index) => (
                  <li className="list-group-item" key={index}>
                    {ingredient.trim()}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  )
}

export { CardComponent };