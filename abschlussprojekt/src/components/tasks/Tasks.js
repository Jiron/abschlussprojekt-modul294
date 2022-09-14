import './Tasks.css';

function Tasks() {
  return (
    <div class="c-tasks">
      <div class="c-tasks__task">
        <img src="/doing.png"></img>
        <span>Dies ist ein Task</span>
      </div>
      <div class="c-tasks__task">
        <img src="/done.png"></img>
        <span>Dies ist ein weiterer Task</span>
      </div>      <div class="c-tasks__task">
        <img src="/done.png"></img>
        <span>Dies ist ein weiterer Task</span>
      </div>
    </div>
  );
}

export default Tasks;
