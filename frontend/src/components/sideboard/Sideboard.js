import './Sideboard.css';

function Sideboard() {
  return (
    <div class="c-sideboard">
      <a class="c-sideboard__item__a c-sideboard__item__a--active" href="/">
        <div class="c-sideboard__item">
          <img src="home.png" />
          <span>Home</span>
        </div>
      </a>
      <a class="c-sideboard__item__a">
        <div class="c-sideboard__item">
          <img src="clock.png" />
          <span>Coming Soon</span>
        </div>
      </a>
      <p class="c-sideboard__copyright">&copy; Copyright - {new Date().getFullYear()} Hallo</p>
    </div>
  );
}

export default Sideboard;
