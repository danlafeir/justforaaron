import React, { useState } from 'react';
import {Button, Image, Badge} from 'react-bootstrap';
import './App.css'

function resolveAfter2Seconds() { 
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [response, setResponse] = useState(null);
  
  const fetchData = async () => {
    setIsLoading(true);
    await resolveAfter2Seconds() // just so
    setResponse(await fetch(`/endpoint`));
    setCount(count+1);
    await resolveAfter2Seconds()
    setIsLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          { response ? `Response is ` + response.statusText + `.` : `What’s the endpoint's status code?` }
        </p>
        <div className="d-flex justify-content-end">
          { isLoading ? 
            <p>Loading…</p>
          :
            <Button onClick={() => fetchData()} variant="outline-success">
              { count === 0 ? `💛 Find Out 💛` : ` Refresh ` }
            </Button>
          }
        </div>
        <div style={{marginTop: "15px"}}> 
            <Image 
              style={{marginRight: "10px", width:"25%", height:"25%"}}
              alt="21 movie reference for 'What's the count?'" 
              src="http://admin.purplerevolver.com/admin/article/articleimages/1392897004-21screen.jpg" 
              roundedCircle={true || "THIS DOESN'T WORK AS EXPECTED https://twitter.com/getaaron/status/1056651301927481344"}/> 
            <Badge variant="info">{count}</Badge>
        </div>
      </header>
    </div>
  );
}

export default App;