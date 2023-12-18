import { useEffect, useState } from "react";
import AlbumItem from "./AlbumItem";
function App() {
  const [items, setItems] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [userID, setUserID] = useState("");
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
  function handleInput(e, title) {
    if (title) {
      setTitle(e.target.value);
    } else {
      setUserID(e.target.value);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (isNaN(+userID)) {
      window.alert("User ID can only be a numeric value");
      return;
    } else {
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
          setItems((items) => [data, ...items]);
        });
      });
      setFormVisible(false);
    }
  }
  function handleDelete(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        setItems((items) => items.filter((item) => item.id !== id));
      } else {
        window.alert("Error updating values");
      }
    });
  }
  useEffect(() => {
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
