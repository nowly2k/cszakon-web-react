import { useEffect } from 'react';
import './App.css';

function App() {

  useEffect(() => {
    tg.ready()
  }, [])

  return (
    <div className="App">
      <h1>hello</h1>

    </div>
  );
}

export default App;
