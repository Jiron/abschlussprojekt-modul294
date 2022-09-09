import './Sideboard.css';

function Sideboard() {
  return (
    <div class="p-sideboard">
      <a class="p-sideboard__item__a p-sideboard__item__a--active" href="/">
        <div class="p-sideboard__item">
          <img src="home.png" />
          <span>Home</span>
        </div>
      </a>
      <a class="p-sideboard__item__a">
        <div class="p-sideboard__item">
          <img src="clock.png" />
          <span>Coming Soon</span>
        </div>
      </a>
    </div>
  );
}

export default Sideboard;
