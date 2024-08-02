import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [isValidJson, setIsValidJson] = useState(true);
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = ['Alphabets', 'Numbers', 'Highest alphabet'];

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
    try {
      JSON.parse(e.target.value);
      setIsValidJson(true);
    } catch (err) {
      setIsValidJson(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValidJson) {
      try {
        const res = await fetch('https://your-app-name.herokuapp.com/bfhl', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: jsonInput,
        });
        const data = await res.json();
        setResponse(data);
      } catch (err) {
        console.error('Error:', err);
      }
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prev) => 
      checked ? [...prev, value] : prev.filter((option) => option !== value)
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    const filteredResponse = {};
    if (selectedOptions.includes('Alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedOptions.includes('Highest alphabet')) {
      filteredResponse.highest_alphabet = response.highest_alphabet;
    }
    return (
      <div className="response">
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  useEffect(() => {
    document.title = "ABCD123";
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>ABCD123</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              rows="10"
              cols="50"
              value={jsonInput}
              onChange={handleJsonChange}
              placeholder='Enter JSON here'
            />
            {!isValidJson && <p className="error">Invalid JSON</p>}
          </div>
          <button type="submit" disabled={!isValidJson}>Submit</button>
        </form>
        {response && (
          <div>
            <div>
              <label>Filter options:</label>
              {options.map((option) => (
                <div key={option}>
                  <input
                    type="checkbox"
                    value={option}
                    onChange={handleOptionChange}
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
            {renderResponse()}
          </div>
        )}
      </header>
    </div>
  );
};

export default App;
