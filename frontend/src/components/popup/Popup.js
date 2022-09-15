import './Popup.css';

function Popup() {
    function closePopup(e) {
        if(e.target.id != "popup") return;
        let popup = document.getElementById('popup');
        if(!popup) return;
        popup.style.display = 'none';
    }

    document.addEventListener('keyup', (evt) => {
        evt = evt || window.event;
        let isEscape = false;
        if ("key" in evt) {
            isEscape = (evt.key === "Escape" || evt.key === "Esc");
        } else {
            isEscape = (evt.keyCode === 27);
        }
        if (isEscape) {
            closePopup();
        }
    });

  return (
    <div id="popup" onMouseDown={(e) => closePopup(e)} class="c-popup">
        <div id="popupDiv" class="c-popup__div">
            <div id="popupContent">

            </div>
        </div>
    </div>
  );
}

export default Popup;
