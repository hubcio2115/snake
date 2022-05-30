import "styles/App.scss";
import Board from "components/Board";

const App = (): JSX.Element => {
  return (
    <div className="App">
      <header>
        <h1>Snake</h1>
      </header>
      <main>
        <Board />
      </main>
    </div>
  );
};

export default App;
