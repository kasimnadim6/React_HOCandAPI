import './App.css';
import RocketList from './RocketList';

function App() {
  return (
    <main>
      <h1>Used: axios, custom hook and a HOC function</h1>
      <RocketList
        filterParams={{ year: 2018, customerName: 'Northrop Grumman' }}
      />
    </main>
  );
}

export default App;
