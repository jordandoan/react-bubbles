import React, { useState } from "react";
import { axiosWithAuth } from '../axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const addColor = () => {
    setEditing(false);
    setColorToEdit(initialColor);
  }
  
  const saveEdit = e => {
    e.preventDefault();
    const URL = `http://localhost:5000/api/colors/`
    if (editing) {
      axiosWithAuth().put(`${URL}${colorToEdit.id}`, colorToEdit)
        .catch(err => console.log(err));
      let newColors = colors.map(oldColor => (oldColor.id != colorToEdit.id ? oldColor : colorToEdit));
      updateColors(newColors);
    } else {
      axiosWithAuth().post(URL, colorToEdit)
        .then(res => updateColors(res.data));
    }
    addColor();
  };

  const deleteColor = color => {
    const URL = `http://localhost:5000/api/colors/${color.id}`;
    axiosWithAuth().delete(URL)
      .catch(err => console.log(err));
    let newColors = colors.filter(oldColor => oldColor.id != color.id);
    updateColors(newColors);
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      <button onClick={addColor}>Add Color</button>
      </ul>
      <form onSubmit={saveEdit}>
        <legend>{editing ? "edit" : "add"} color</legend>
        <label>
          color name:
          <input
            onChange={e =>
              setColorToEdit({ ...colorToEdit, color: e.target.value })
            }
            value={colorToEdit.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setColorToEdit({
                ...colorToEdit,
                code: { hex: e.target.value }
              })
            }
            value={colorToEdit.code.hex}
          />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            {editing && <button onClick={() => setEditing(false)}>cancel</button>}
          </div>
        </form>
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
