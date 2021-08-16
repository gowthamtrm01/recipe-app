import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { recipesContext } from '../App';
import { useContext } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '55ch',
    },
  },
}));

function SearchBar() {

  const classes = useStyles();
  const { dispatch, state } = useContext(recipesContext);

  return (
    <div style={{ margin: '20px 0 10px 0px' }}>
      <TextField onChange={(event) => {
        let value = event.target.value;
        if (value) {
          const filtersObj = state.map((recipe) => {
            if (!recipe.title.toLowerCase().includes(value.toLowerCase())) {
              recipe.hide = true;
              return recipe
            }
            return recipe;
          })
          dispatch({
            type: "SEARCH-RECIPE",
            payload: filtersObj
          })
        } else {
          const allRecipies = state.map((item) => {
            item.hide = false;
            return item;
          })
          dispatch({
            type: "SEARCH-RECIPE",
            payload: allRecipies
          })
        }
      }} className={classes.root} id="outlined-basic" label="Search Recipe" variant="outlined" />
      {/* <input onChange={} type="text" placeholder="Search recipe..." className="searchBar" ></input> */}
    </div>
  )
}

export { SearchBar };