import { useEffect, useState } from 'react';
import axios from 'axios';
import Register from './components/Registration/Register';

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('dog');
  const [number, setNumber] = useState(15);
  useEffect(() => {
    (() => {
      axios.get(`/api/dictionary/${searchTerm}`)
        .then(res => {
          console.log(res)
          setData(res.data);
        })
        .catch(error => console.log(error))
    })();

  }, [])
  useEffect(() => {
    (() => {
      axios.get(`/api/num/${number}`)
        .then(res => {
          console.log("hi",number);
          console.log(res)
          // setData(res.data);
        })
        .catch(error => console.log(error))
    })();
  }, [])

  return (
    <div>
      <h1>hello</h1>
      <Register/>
    </div>
  );
}

export default App;
