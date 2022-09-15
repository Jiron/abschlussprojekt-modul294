import './Header.css';

function Header() {
  function openRegisterPopup() {
    let popup = document.getElementById('popup');
    let popupContent = document.getElementById('popupContent');
    if(!popup) return;
    if(!popupContent) return;
    popupContent.innerHTML = `
      <form id="createUserPopup">
        <h3>Create New User</h3>
        <label for="usernameInput">Username</input>
        <input id="usernameInput" name="usernameInput" type="text" placeholder="Username" required>
        <label for="emailInput">E-Mail</input>
        <input id="emailInput" name="emailInput" type="email" placeholder="E-Mail" required>
        <label for="passwordInput">Password</input>
        <input id="passwordInput" name="passwordInput" type="password" placeholder="Password" required>
        <p id="popupError"></p>
        <button id="submit" type="submit">Create</button>
      </form>
    `;
    popup.style.display = 'block';

    document.getElementById('createUserPopup').addEventListener('submit', async (evt) => {
      evt.preventDefault();
      let createUserPopup = document.getElementById('createUserPopup');
      let user = {
        username: createUserPopup.querySelector('#usernameInput').value,
        email: createUserPopup.querySelector('#emailInput').value,
        password: createUserPopup.querySelector('#passwordInput').value
      }
      
      fetch('http://localhost:3000/signup', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
      }).then((response) => response.json())
      .then((data) => {
        if(data.accessToken) {
          sessionStorage.setItem('token', data.accessToken);
          sessionStorage.setItem('userId', data.user.id);
          window.location.href = "/";
        }
        else {
          document.getElementById('popupError').innerHTML = data;
        }
      });
    });
  }

  function openLoginPopup() {
    let popup = document.getElementById('popup');
    let popupContent = document.getElementById('popupContent');
    if(!popup) return;
    if(!popupContent) return;
    popupContent.innerHTML = `
      <form id="logInPopUp">
        <h3>Login</h3>
        <label for="emailInput">E-Mail</input>
        <input id="emailInput" name="emailInput" type="email" placeholder="E-Mail" required>
        <label for="passwordInput">Password</input>
        <input id="passwordInput" name="passwordInput" type="password" placeholder="Password" required>
        <p id="popupError"></p>
        <button id="submit" type="submit">Login</button>
      </form>
    `;
    popup.style.display = 'block';

    document.getElementById('logInPopUp').addEventListener('submit', async (evt) => {
      evt.preventDefault();
      let logInPopUp = document.getElementById('logInPopUp');
      let user = {
        email: logInPopUp.querySelector('#emailInput').value,
        password: logInPopUp.querySelector('#passwordInput').value
      }
      
      fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer`
        },
      }).then((response) => response.json())
      .then((data) => {
        if(data.accessToken) {
          sessionStorage.setItem('token', data.accessToken);
          sessionStorage.setItem('userId', data.user.id);
          window.location.href = "/";
        }
        else {
          document.getElementById('popupError').innerHTML = data;
        }
      });
    });
  }

  return (
    <header class="p-header">
        <div class="p-header__content">
            <img class="p-header__icon" src="/icon-gray.png" />
            <h2 class="p-header__title">ToDo-List</h2>
            <button onClick={() => openLoginPopup()} id="login" class="p-header__login">Login</button>
            <button onClick={() => openRegisterPopup()} class="p-header__register">Register</button>
        </div>
    </header>
  );
}

export default Header;
