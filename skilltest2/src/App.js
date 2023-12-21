import { useEffect, useState } from "react";
import AlbumItem from "./AlbumItem";
function App() {
  const [items, setItems] = useState([]); // State for album items, updated once all albums are fetched from the server
  const [formVisible, setFormVisible] = useState(false); // State used to toggle visibility of add album form
  const [title, setTitle] = useState(""); // state variable to store new album title value
  const [userID, setUserID] = useState(""); // state variable to store new album userID value

  // Style variables
  const displayStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  };
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    width: "20%",
    border: "1px solid black",
    padding: "1%",
  };
  const btnStyle = {
    border: "1px solid black",
    padding: "1% 2%",
    backgroundColor: "lightgreen",
    fontSize: "1.4rem",
    margin: "1vh auto",
    width: "10vw",
  };
  const itemContainerStyle = {
    display: "flex",
    alignItems: "center",
    width: "20vw",
  };

  // common function to handle form input field values and update our title and userID state variables , title argument is a boolean value which tells us wether we are updating title or user input state variable
  function handleInput(e, title) {
    if (title) {
      setTitle(e.target.value);
    } else {
      setUserID(e.target.value);
    }
  }

  // function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    //Check to make sure user ID entered can only be a numeric value
    if (isNaN(+userID)) {
      window.alert("User ID can only be a numeric value"); //if not numeric alert user
      return;
    } //else do dummy POST call to the server using the data
    else {
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          userID,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((res) => {
        res.json().then((data) => {
          data.userId = data.userID;
          setItems((items) => [data, ...items]); // updating album items state variable so that newly added album is visible despite it being a dummy call to the server
        });
      });
      setFormVisible(false);
    }
  }
  //function to handle album delete which takes album id as a argument based on which album items state variable is updated using filter function and dummy delete call is sent to the server
  function handleDelete(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        // if call was success server returns a boolean ok value to tell the same
        setItems((items) => items.filter((item) => item.id !== id));
      } else {
        window.alert("Error updating values");
      }
    });
  }
  useEffect(() => {
    //function to fetch data from the server and update our state variable based on that
    async function getData() {
      const res = await fetch("https://jsonplaceholder.typicode.com/albums");
      const data = await res.json();
      setItems(data);
    }
    getData();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="App"
    >
      <h1 style={{ textAlign: "center", fontSize: "4rem", color: "darkgreen" }}>
        Albums App
      </h1>
      {!formVisible ? (
        <button
          style={btnStyle}
          onClick={() => {
            setFormVisible(true);
          }}
        >
          Add Album
        </button>
      ) : (
        <form style={formStyle} onSubmit={handleSubmit}>
          <label htmlFor="userID">User ID</label>
          <input
            type="text"
            value={userID}
            onChange={(e) => {
              handleInput(e, false);
            }}
            required
          />
          <label htmlFor="userID">Album Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              handleInput(e, true);
            }}
            required
          />
          <button style={btnStyle} type="submit">
            Add
          </button>
        </form>
      )}

      <div style={displayStyle} className="main-display">
        {items.map((item) => (
          <div
            key={item.id}
            style={itemContainerStyle}
            className="item-container"
          >
            <AlbumItem id={item.id} userId={item.userId} title={item.title} />
            <button
              style={{
                height: "fit-content",
                padding: "0",
                width: "fit-content",
                border: "1px solid red",
              }}
              onClick={() => {
                handleDelete(item.id);
              }}
            >
              <img
                alt="delete icon"
                src="https://icon-library.com/images/delete-icon-image/delete-icon-image-18.jpg"
                style={{
                  height: "3vh",
                  width: "1.5vw",
                  margin: "0",
                  padding: "0",
                }}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
