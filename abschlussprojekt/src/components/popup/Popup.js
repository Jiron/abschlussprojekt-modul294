import './Popup.css';

function Popup() {
    function closePopup() {
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
    <div id="popup" onClick={() => closePopup()} class="c-popup">
        <div onClick={(e) => e.preventDefault()} class="c-popup__div">
            <div id="popupContent">

            </div>
        </div>
    </div>
  );
}

export default Popup;
