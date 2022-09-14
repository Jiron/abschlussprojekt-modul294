import './Contentfield.css';
import Tasks from '../../components/tasks/Tasks';

function Contentfield() {
  function openPopup() {
    let popup = document.getElementById('popup');
    let popupContent = document.getElementById('popupContent');
    if(!popup) return;
    if(!popupContent) return;
    popupContent.innerHTML = "";
    popupContent.appendChild(document.createElement('h3').appendChild(document.createTextNode('Hallo')));
    popup.style.display = 'block';
  }

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
