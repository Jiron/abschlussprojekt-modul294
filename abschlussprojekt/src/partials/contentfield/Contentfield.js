import './Contentfield.css';
import Tasks from '../../components/tasks/Tasks';

function Contentfield() {
  function openPopup() {
    let popup = document.getElementById('popup');
    let popupContent = document.getElementById('popupContent');
    if(!popup) return;
    if(!popupContent) return;
    popupContent.innerHTML = `
      <form id="createTaskPopup">
        <h3>Create Task</h3>
        <label for="textInput">Text</label>
        <input id="textInput" name="textInput" type="text" placeholder="Text" required>
        <label for="descriptionInput">Description</label>
        <textarea id="descriptionInput" name="descriptionInput" rows="4" cols="50" placeholder="Description" required></textarea>
        <button id="submit" type="submit">Create</button>
      </form>
    `;
    popup.style.display = 'block';

    document.getElementById('createTaskPopup').addEventListener('submit', async (evt) => {
      evt.preventDefault();
      fetch('http://localhost:3000/tasks', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
        }).then((response) => response.json())
        .then((data) => {
            let createTaskPopup = document.getElementById('createTaskPopup');
            let task = {
              text: createTaskPopup.querySelector('#textInput').value,
              description: createTaskPopup.querySelector('#descriptionInput').value,
              state: "doing"
            }
            
            fetch('http://localhost:3000/tasks', {
              method: 'POST',
              body: JSON.stringify(task),
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
              },
            }).then(() => window.location.href = "/")
          });
        });
  };

  setTimeout(() => {
    if(!sessionStorage.getItem('token') || !sessionStorage.getItem('username') || !sessionStorage.getItem('userId')) {
      document.getElementById('createTask').style.display = "none";
    }
  });

  return (
    <div class="p-contentfield">
      <Tasks />
      <div class="p-contentfield__createtask">
        <img id="createTask" src="plus.png" onClick={() => openPopup()}/>
      </div>
    </div>
  );
}

export default Contentfield;
