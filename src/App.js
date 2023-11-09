import React from "react";

function App() {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    setTimeout(() => {
      setData({});
    }, 200)
  }, []);

  return (
    <div>
      {data && <div style={{color: "red", width: "100%"}}>dataText</div>}
      <h1>Main Title</h1>
        <button>click btn</button>
        <input type="text" placeholder="input value"/>
    </div>
  );
}

export default App;
