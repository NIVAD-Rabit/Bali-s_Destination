import React from 'react';
import VideoPlayer from './VideoPlayer'; // Import the VideoPlayer component

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My React App</h1>
      </header>
      <main>
        {/* Your application content and components go here */}
        <VideoPlayer /> {/* Use the VideoPlayer component */}
      </main>
      <footer>
        <p>&copy; 2024 My React App</p>
      </footer>
    </div>
  );
};

export default App;
