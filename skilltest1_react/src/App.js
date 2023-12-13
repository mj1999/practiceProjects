import Dropdown from "./Dropdown";
const items = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];
function App() {
  return (
    <div className="App" style={{ backgroundColor: "grey", height: "100vh" }}>
      <div
        className="display"
        style={{
          width: "50%",
          height: "50%",
          margin: "auto",
          paddingTop: "2%",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>My Dropdown</h1>
        <Dropdown items={items} width={"20vw"} fontSize={"2rem"} />
      </div>
    </div>
  );
}

export default App;
