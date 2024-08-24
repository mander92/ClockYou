import { useState } from 'react';
import './App.css';
import './index.css';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hola desde el Front de ClockYou</h1>
      <h2>Empezando a darle estructura al Front de ClockYou</h2>

      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
};

export default App;
