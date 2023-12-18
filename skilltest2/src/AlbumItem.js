import { useState } from "react";

function AlbumItem({ userId, title, id }) {
  const [userIdVal, setUserIdVal] = useState(userId);
  const [titleVal, setTitleVal] = useState(title);
  const [showForm, setShowForm] = useState(false);
  function handleInput(e, title) {
    if (title) {
      setTitleVal(e.target.value);
    } else {
      setUserIdVal(e.target.value);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (isNaN(+userIdVal)) {
      window.alert("User ID can only be a numeric value");
      return;
    }
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: { titleVal },
        userId: { userIdVal },
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.ok) {
        setShowForm(false);
      } else {
        window.alert("Error updating values");
      }
    });
  }
  const displayStyle = {
    display: "flex",
    width: showForm ? "auto" : "95%",
    height: "18vh",
    boxShadow: "0 0 2px 1px grey",
    margin: "2%",
  };
  const idDisplay = {
    width: "20%",
    color: "grey",
    foneWeight: "800",
    fontSize: "4rem",
    padding: "2% 5%",
    boxShadow: "0 0 2px 1px grey",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  };
  const titleDisplay = {
    width: "80%",
    fontSize: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1%",
  };

  const editFormStyle = {
    display: showForm ? "flex" : "none",
    flexDirection: "column",
    width: "200%",
    border: "1px solid black",
    padding: "1%",
    backgroundColor: "grey",
    zIndex: "10",
  };
  return (
    <div style={displayStyle} className="album-display">
      <div style={idDisplay} className="userid">
        <span>{userIdVal}</span>
      </div>
      <div style={titleDisplay} className="title">
        <span style={{ padding: "1% 5%", width: "90%" }}>{titleVal}</span>
        {showForm ? (
          <form style={editFormStyle} onSubmit={handleSubmit}>
            <label htmlFor="userID">User ID</label>
            <input
              type="text"
              value={userIdVal}
              onChange={(e) => {
                handleInput(e, false);
              }}
              required
            />
            <label htmlFor="userID">Album Title</label>
            <input
              type="text"
              value={titleVal}
              onChange={(e) => {
                handleInput(e, true);
              }}
              required
            />
            <button type="submit">Add</button>
          </form>
        ) : (
          <button
            style={{
              border: "1px solid black",
              padding: "2% 4%",
              margin: "0.2vh",
              backgroundColor: "#D3D3D3",
              fontSize: "1.2rem",
              color: "green",
            }}
            onClick={() => {
              setShowForm(true);
            }}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default AlbumItem;
