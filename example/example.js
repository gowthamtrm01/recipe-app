import './App.css';
import { useState } from 'react';

function App() {
  const [colors, setColors] = useState(['red', 'green', 'orange', 'black', 'blue', 'yellow']);
  const colorOne = ['red', 'green', 'orange', 'black', 'blue', 'yellow'];
  const [oneColor, setOneColor] = useState();
  const [colorTwo, setColorTwo] = useState(0);
  const [newColor, setNewColor] = useState();
  return (
    <div className="App">
      <div>
      <input type="text" onChange={event => {
        setOneColor(event.target.value)
      }} style={{backgroundColor: oneColor}}></input>
      <button onClick={() => {
        colorTwo === colorOne.length -1 ? setColorTwo(0) : setColorTwo(colorTwo + 1);
      }}>MultiColor</button>
      <div style={{backgroundColor: colorOne[colorTwo], height: '50px', width: '100px'  }}></div>
      </div>
      <input onChange={(event => {
        setNewColor(event.target.value);
      })}></input>
      <button onClick={() => {
        setColors([...colors, newColor])
        }}>Add Color</button>
      {
        colors.map((col, deleteIndex) => (
        <div style={{}} >
          <div style={{backgroundColor: col, height: '50px', width: '100px', margin: '10px 10px', display: 'inline-block', verticalAlign: 'middle'}}></div>
          <button style={{verticalAlign: 'middle'}} onClick={() => {setColors(colors.filter((color, index) => deleteIndex !== index))}} >delete</button>
        </div>
          ))
      }
    </div>
  );
}

export default App;
