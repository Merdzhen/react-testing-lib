import React from "react";

function App() {
  const [data, setData] = React.useState(null);
  const [toggle, setToggle] = React.useState(false);
  const [value, setValue] = React.useState('')

  const handleClick = () => setToggle(prev=> !prev)

  React.useEffect(() => {
    setTimeout(() => {
      setData({});
    }, 200)
  }, []);

  return (
    <div>
      <h1 data-testid="value-elem">{value}</h1>
      {toggle && <div data-testid="toggle-elem">toggleText</div>}
      {data && <div style={{color: "red", width: "100%"}}>dataText</div>}
      <h1>Main Title</h1>
        <button onClick={handleClick} data-testid="toggle-btn">click btn</button>
        <input type="text" placeholder="input value" onChange={e => setValue(e.target.value)}/>
    </div>
  );
}

export default App;
