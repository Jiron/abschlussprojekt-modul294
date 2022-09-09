import './Header.css';

function Header() {
  return (
    <header class="p-header">
        <div class="p-header__content">
            <img class="p-header__icon" src="/icon-gray.png" />
            <h2 class="p-header__title">ToDo-List</h2>
        </div>
    </header>
  );
}

export default Header;
