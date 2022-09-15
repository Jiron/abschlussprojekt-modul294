import './Header.css';

function Header() {
  function logout() {
    sessionStorage.clear();
    window.location.reload();
  }

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
          sessionStorage.setItem('username', data.user.username);
          window.location.reload();
        }
        else {
          document.getElementById('popupError').innerHTML = data;
        }
      });
    });
  }

  function openLoginPopup(title) {
    let popup = document.getElementById('popup');
    let popupContent = document.getElementById('popupContent');
    if(!popup) return;
    if(!popupContent) return;
    popupContent.innerHTML = `
      <form id="logInPopUp">
        <h3>${title}</h3>
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
          sessionStorage.setItem('username', data.user.username);
          window.location.reload();
        }
        else {
          document.getElementById('popupError').innerHTML = data;
        }
      });
    });  
  }

  setTimeout(() => {
    if(sessionStorage.getItem('token') && sessionStorage.getItem('username')) {
      document.getElementById('welcome').innerHTML = `Welcome back ${sessionStorage.getItem('username')}!`;
      document.getElementById('login').style.display = "none";
      document.getElementById('register').style.display = "none";
      document.getElementById('register').style.display = "none";
    }
    else {
      document.getElementById('welcome').style.display = "none";
      document.getElementById('switchAccounts').style.display = "none";
      document.getElementById('logout').style.display = "none";
    }
  });

  return (
    <header class="p-header">
        <div class="p-header__content">
            <img class="p-header__icon" src="/icon-gray.png" />
            <h2 class="p-header__title">ToDo-List</h2>
            <h4 id="welcome" class="p-header__welcome"></h4>
            <button onClick={() => openLoginPopup("Login")} id="login" class="p-header__login">Login</button>
            <button onClick={() => openRegisterPopup()} id="register" class="p-header__register">Register</button>
            <button onClick={() => openLoginPopup("Switch Accounts")} id="switchAccounts" class="p-header__switchaccounts">Switch Accounts</button>
            <button onClick={() => logout()} id="logout" class="p-header__logout">Logout</button>
        </div>
    </header>
  );
}

export default Header;
