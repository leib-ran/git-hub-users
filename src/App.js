import "./App.css";
import Page from "../src/compnents/Page/Page";

function App() {
  return (
    <div
      className=" h-screen	 w-f bg-no-repeat bg-center bg-contain "
      style={{
        backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png")`,
      }}
    >
      <div className="bg-gradient-to-r h-full from-yellow-400 via-red-400 to-pink-400 opacity-95">
        <div className="App">
          <Page></Page>
        </div>
      </div>
    </div>
  );
}

export default App;
