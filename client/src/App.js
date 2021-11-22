import { dictionary } from './utils/utils';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    (async() => {
      await dictionary('dog');
    })();

  }, [])

  return (
    <div>

    </div>
  );
}

export default App;
