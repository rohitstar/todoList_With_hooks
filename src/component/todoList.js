import React, { useState, useEffect } from "react";
// import todo from "../images/todo.svg";
import "../App.css";

// to get the data from LS

const getLocalItmes = () => {
  let list = localStorage.getItem("lists");
  console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItmes());

  const addItem = () => {
    if (!inputData) {
    } else {
      setItems([...items, inputData]);
      setInputData("");
    }
  };

  // delete the items
  const deleteItem = (id) => {
    console.log(id);
    const updateditems = items.filter((elem, ind) => {
      return ind !== id;
    });

    setItems(updateditems);
  };

  // remove all
  const removeAll = () => {
    setItems([]);
  };

  // add data to localStorage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            {/* <img src={todo} alt="todologo" /> */}
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Items..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            <button
              style={{
                padding: "15px",
                border: "none",
                borderRadius: "25px",
                fontSize: "18px",
                fontWeight: "bold",
                marginLeft: "20px",
              }}
              //   className="fa fa-plus add-btn"
              title="Add Item"
              onClick={addItem}
            >
              Go
            </button>
          </div>

          <div className="showItems">
            {items.map((elem, ind) => {
              return (
                <div className="eachItem" key={ind}>
                  <h3>{elem}</h3>
                  <button
                    style={{
                      padding: "5px10px",
                      border: "1px solid #fff",
                      borderRadius: "25px",
                      fontSize: "14px",
                      outline: "none",
                      fontWeight: "bold",
                      marginLeft: "20px",
                      backgroundColor: "red",
                      color: "#fff",
                    }}
                    className="far fa-trash-alt add-btn"
                    title="Delete Item"
                    onClick={() => deleteItem(ind)}
                  >
                    trash
                  </button>
                </div>
              );
            })}
          </div>

          {/* clear all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span> CHECK LIST </span>{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
