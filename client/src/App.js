import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('dog');
  useEffect(() => {
    (() => {
      axios.get(`/api/${searchTerm}`)
        .then(res => {
          console.log(res)
          setData(res.data);
        })
        .catch(error => console.log(error))
    })();

  }, [])

  return (
    <div>

    </div>
  );
}

export default App;
