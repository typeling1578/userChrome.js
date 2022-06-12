/* Screen Lock
 *
 * © 2022 typeling1578.
 * GNU General Public License v3.0
 */

(function () {
    const SCREEN_LOCK_CSS = `
    .toolbar-items, #nav-bar, #PersonalToolbar, #browser {
      visibility: hidden
    }
    
    body:after {
      content: "Screen Lock";
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%)
    }
    `;

    let UnLockMatchString = Services.prefs.getStringPref("userChrome.screenlock.unlockstring", "unlock");

    let inputKey = [];

    let isLock = false;

    let screenLockCSS_elem = document.createElement("style");
    document.body.appendChild(screenLockCSS_elem);

    function lock() {
        screenLockCSS_elem.textContent = SCREEN_LOCK_CSS;
    }

    function unlock() {
        screenLockCSS_elem.textContent = "";
    }

    window.addEventListener("keydown", function(e){
        if (isLock) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.preventDefault();
            inputKey.push(e.key);
            let matchString = UnLockMatchString.split("");
            if (inputKey.length > matchString.length) {
                inputKey.shift();
            }
            if (inputKey.toString() == matchString.toString()) {
                unlock();
                inputKey = [];
                isLock = false;
            }
        } else {
            if (e.ctrlKey && e.altKey && e.shiftKey && (e.key == "l" || e.key == "L")) {
                e.stopPropagation();
                e.stopImmediatePropagation();
                e.preventDefault();
                lock();
                inputKey = [];
                isLock = true;
            }
        }
    }, true)
}());
