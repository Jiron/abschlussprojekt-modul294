import './Tasks.css';

function Tasks() {

  function taskTemplate(tasks) {
    return `
      <div taskid="${tasks.id}" class="js-task c-tasks__task">
        <img src="/${tasks.state}.png" />
        <span>${tasks.text}</span>
      </div>
    `
  }

  window.onload = function() {
    fetch('http://localhost:3000/tasks').then(async response => {
      let tasks = await response.json();
      document.getElementById('taskOverview').innerHTML = `${tasks.map(taskTemplate).join('')}`;
    
      var DOMTasks = document.getElementsByClassName("js-task");
      for(var i = 0; i < DOMTasks.length; i++) {
        DOMTasks[i].addEventListener('click', (evt) => {
          let taskID = evt.srcElement.getAttribute('taskid') || evt.target.getAttribute('taskid');
          let task = tasks.filter(x => x.id == taskID)[0];
          if(!task) return;
          task.state == "doing" ? task.state = "done" : task.state = "doing";
          fetch(`http://localhost:3000/tasks/${taskID}`, {
            method: 'PUT',
            body: JSON.stringify(task),
            headers: {
              'Content-Type': 'application/json'
            },
          }).then(() => window.location.href = "/")
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
