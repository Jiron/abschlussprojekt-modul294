import './App.css';
import Header from './partials/header/Header';
import Contentfield from './partials/contentfield/Contentfield';
import Sideboard from './components/sideboard/Sideboard';

function App() {
  return (
    <div>
      <Header />
      <div class="app-content">
        <Sideboard />
        <Contentfield />
      </div>
    </div>
  );
}

export default App;
