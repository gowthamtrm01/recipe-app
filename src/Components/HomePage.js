import { SearchBar } from './SearchBar';
import { CardComponent } from './Card';
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { recipesContext } from '../App';
import { useContext } from 'react';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function HomePage({ setRecipes }) {

  const classes = useStyles();
  const history = useHistory();

  const { state } = useContext(recipesContext);

  return (
    <div className="container">
      <SearchBar />
      <div>
        <Button
          onClick={() => {
            history.push('/add');
          }}
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<AddIcon />}
        >
          Add Recipe
        </Button>
      </div>
      {state.map((recipe, index) => {
        if (recipe.hide) {
          return undefined
        } else {
          return (
            <CardComponent recipe={recipe} setRecipes={setRecipes} key={index} />
          )
        }
      })}
    </div>
  )
}