import './Tasks.css';

function Tasks() {

  function taskTemplate(tasks) {
    return `
      <div taskid="${tasks.id}" class="js-task c-tasks__task">
        <img class="c-tasks__task__state" src="/${tasks.state}.png" />
        <span>${tasks.text}</span>
        <img class="c-tasks__task__edit js-edit" taskid="${tasks.id}" src="/edit.png" />
        <img class="c-tasks__task__delete js-delete" taskid="${tasks.id}" src="/delete.png" />
      </div>
    `
  }

  window.onload = function() {
    fetch('http://localhost:3000/tasks', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
    }).then(async response => {
      let tasks = await response.json();
      document.getElementById('taskOverview').innerHTML = `${tasks.map(taskTemplate).join('')}`;
    
      var DOMTasks = document.getElementsByClassName("js-task");
      for(var i = 0; i < DOMTasks.length; i++) {
        DOMTasks[i].addEventListener('click', (evt) => {
          let taskID = evt.srcElement.getAttribute('taskid') || evt.target.getAttribute('taskid');
          let task = tasks.filter(x => x.id == taskID)[0];
          if(!evt.target.classList.contains("js-task")) return;
          if(!task) return;
          task.state == "doing" ? task.state = "done" : task.state = "doing";
          fetch(`http://localhost:3000/tasks/${taskID}`, {
            method: 'PUT',
            body: JSON.stringify(task),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
          }).then(() => window.location.href = "/");
        });
        DOMTasks[i].getElementsByClassName('js-delete')[0].addEventListener('click', (evt) => {
          let taskID = evt.srcElement.getAttribute('taskid') || evt.target.getAttribute('taskid');
          fetch(`http://localhost:3000/tasks/${taskID}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
          }).then(() => window.location.href = "/")
        });
        DOMTasks[i].getElementsByClassName('js-edit')[0].addEventListener('click', (evt) => {
          let taskID = evt.srcElement.getAttribute('taskid') || evt.target.getAttribute('taskid');
          let task = tasks.filter(x => x.id == taskID)[0];
          if(!task) return;
          let popup = document.getElementById('popup');
          let popupContent = document.getElementById('popupContent');
          if(!popup) return;
          if(!popupContent) return;
          popupContent.innerHTML = `
            <form taskid="${taskID}" id="editTaskPopup">
              <h3>Edit Task ID: ${taskID}</h3>
              <label for="textInput">Text</input>
              <input id="textInput" name="textInput" type="text" placeholder="Name" value="${task.text}" required>
              <label for="descriptionInput">Description</input>
              <textarea id="descriptionInput" name="descriptionInput" rows="4" cols="50" placeholder="Description" required>${task.description}</textarea>
              <button id="submit" type="submit">Edit</button>
            </form>
          `;
          popup.style.display = 'block';

          document.getElementById('editTaskPopup').addEventListener('submit', async (evt) => {
            evt.preventDefault();
            fetch('http://localhost:3000/tasks', {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            }).then((response) => response.json())
            .then((tasks) => {
              let taskID = evt.srcElement.getAttribute('taskid') || evt.target.getAttribute('taskid');
              console.log(evt.srcElement);
              console.log(tasks.filter(x => x.id == taskID)[0])
              let editTaskPopup = document.getElementById('editTaskPopup');
              let taskEdited = {
                id: task.id,
                text: editTaskPopup.querySelector('#textInput').value,
                description: editTaskPopup.querySelector('#descriptionInput').value,
                state: task.state,
                createdAt: task.createdAt
              }
              
              fetch(`http://localhost:3000/tasks/${taskID}`, {
                method: 'PUT',
                body: JSON.stringify(taskEdited),
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
              }).then(() => window.location.href = "/");
            });
          });
        });
      }
    });
  }

  return (
    <div id="taskOverview" class="c-tasks">
    </div>
  );
}

export default Tasks;