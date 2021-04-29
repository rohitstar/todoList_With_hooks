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
  const [taggleButton, setTaggleButton] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItem = () => {
    if (!inputData) {
      console.log("msdks");
    } else if (inputData && !taggleButton) {
      setItems(
        items.map((element) => {
          if (element.id === isEditItem) {
            return { ...element, name: inputData };
          }
          return element;
        })
      );

      setTaggleButton(true);
      setInputData("");
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  const deleteItem = (index) => {
    // console.warn("check the items", id);
    const updateditems = items.filter((element) => {
      return index !== element.id;
    });
    setItems(updateditems);
  };

  const editItem = (id) => {
    const newEditItem = items.find((element, index) => {
      return element.id === id;
    });
    // setItems(newEditItem);
    console.warn("item", newEditItem);
    setTaggleButton(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);
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
          {taggleButton ? (
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
          ) : (
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
              title="Update Item"
              onClick={addItem}
            >
              Edit
            </button>
          )}
        </div>

        <div className="showItems">
          {items.map((element) => {
            return (
              <div className="eachItem" key={element.id}>
                <h3>{element.name}</h3>
                <div>
                  <button
                    style={{
                      padding: "5px 10px",
                      border: "1px solid #fff",
                      borderRadius: "25px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginLeft: "20px",
                      backgroundColor: "green",
                      color: "#fff",
                    }}
                    // className="far fa-trash-alt add-btn"
                    title="Edit Item"
                    onClick={() => editItem(element.id)}
                  >
                    Edit
                  </button>

                  <button
                    style={{
                      padding: "5px 10px",
                      border: "1px solid #fff",
                      borderRadius: "25px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginLeft: "5px",
                      backgroundColor: "red",
                      color: "#fff",
                    }}
                    // className="far fa-trash-alt add-btn"
                    title="Delete Item"
                    onClick={() => deleteItem(element.id)}
                  >
                    Trash
                  </button>
                </div>
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
