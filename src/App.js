import { useState } from 'react';
import './App.css';
import EncryptPrompt from './Components/EncryptPrompt';
import DecryptPrompt from './Components/DecryptPrompt'

function App() {
  const getQs = () => {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const qs = params.get('key');
    return qs;
  };

  const [qs, setQs] = useState(() => getQs());

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div>
        {qs ? <div><DecryptPrompt qs={qs} /></div> : <EncryptPrompt />}
      </div>
    </div>
  );
}

export default App;
