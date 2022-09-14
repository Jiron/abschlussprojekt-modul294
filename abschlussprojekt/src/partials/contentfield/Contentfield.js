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
        <input id="textInput" name="textInput" type="text" placeholder="Name" required>
        <textarea id="descriptionInput" name="descriptionInput" rows="4" cols="50" placeholder="Description" required></textarea>
        <button id="submit" type="submit">Create</button>
      </form>
    `;
    popup.style.display = 'block';

    document.getElementById('createTaskPopup').addEventListener('submit', async (evt) => {
      fetch('http://localhost:3000/tasks')
        .then((response) => response.json())
        .then((data) => {
            evt.preventDefault();
            let createTaskPopup = document.getElementById('createTaskPopup');
            let task = {
              id: data.length == 0 ? 1 : data[data.length - 1].id + 1,
              text: createTaskPopup.querySelector('#textInput').value,
              description: createTaskPopup.querySelector('#descriptionInput').value,
              state: "doing"
            }
            
            fetch('http://localhost:3000/tasks', {
              method: 'POST',
              body: JSON.stringify(task),
              headers: {
                'Content-Type': 'application/json'
              },
            }).then(() => window.location.href = "/")
          });
        });
  };

  return (
    <div class="p-contentfield">
      <Tasks />
      <div class="p-contentfield__createtask">
        <img src="plus.png" onClick={() => openPopup()}/>
      </div>
    </div>
  );
}

export default Contentfield;
