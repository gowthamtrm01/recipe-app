import { useParams, useHistory } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { recipesContext } from '../App';
import { useContext } from 'react';

export default function LearnMore() {
    const { id } = useParams();
    const history = useHistory();
    const { state } = useContext(recipesContext);
    const recipe = state.find((item) => item._id === id)

    return (
        <div>
            <div className="container">
                <IconButton onClick={() => { history.goBack() }}>
                    <ArrowBackIcon />
                </IconButton>
                <div style={{ textAlign: 'center' }}>
                    <img className="image" src={recipe.image} alt={recipe.title}></img>
                </div>
                <div>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <h4>Recipe Name:<span className="recipe-text"> {recipe.title}</span></h4>
                        </li>
                        <li className="list-group-item">
                            <h4>Recipe Ingerdients:</h4>
                            <ul className="list-group">
                                {recipe.ingredients.map((item, index) => <li key={index} className="list-group-item"><h5 className="recipe-text">{item}</h5></li>)}
                            </ul>
                        </li>
                        <li className="list-group-item">
                            <h4>Cooking Procedure:</h4>
                            <h5 className="recipe-text" >{recipe.procedure}</h5>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
