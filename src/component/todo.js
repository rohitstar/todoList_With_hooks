import React, { useState, useEffect } from "react";
import "../App.css";

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

  const deleteItem = (id) => {
    console.warn("check the items", id);
    const updateditems = items.filter((element, index) => {
      return index !== id;
    });
    setItems(updateditems);
  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <div className="main-div">
      <div className="child-div">
        <figure>
          {/* <img src={todo} alt="todologo" /> */}
          <figcaption>Add Your List Here ✌</figcaption>
        </figure>

        <div className="addItems">
          <input
            type="text"
            placeholder="Add Items..."
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
          {items.map((element, index) => {
            return (
              <div className="eachItem" key={index}>
                <h3>{element}</h3>
                <button
                  style={{
                    padding: "5px 10px",
                    border: "1px solid #fff",
                    borderRadius: "25px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginLeft: "20px",
                    backgroundColor: "red",
                    color: "#fff",
                  }}
                  // className="far fa-trash-alt add-btn"
                  title="Delete Item"
                  onClick={() => deleteItem(index)}
                >
                  Trash
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
  );
};

export default Todo;
