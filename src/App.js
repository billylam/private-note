import { useState } from 'react';
import './App.css';
import EncryptPrompt from './Components/EncryptPrompt';
import DecryptPrompt from './Components/DecryptPrompt';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

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
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Privates notes
          </Typography>
        </Toolbar>
      </AppBar>
      </header>
      <div>
        {qs ? <DecryptPrompt qs={qs} /> : <EncryptPrompt />}
      </div>
    </div>
  );
}

export default App;
