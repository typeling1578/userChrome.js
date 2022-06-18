/* Restart Button
 *
 * © 2022 typeling1578.
 * GNU General Public License v3.0
 */

(function(){
  const restart = function(){
    Services.startup.quit(
      Services.startup.eRestart | Services.startup.eAttemptQuit
    );
  }
  const restartButton = document.createXULElement("toolbarbutton");
  restartButton.id = "appMenu-restart-button";
  restartButton.classList.add("subviewbutton");
  restartButton.label = "Restart";
  restartButton.setAttribute("oncommand", "(" + restart.toString() + ")()")
  if(PanelMultiView.getViewNode(document, "appMenu-restart-button")) {
    PanelMultiView.getViewNode(document, "appMenu-restart-button").remove();
  }
  PanelMultiView.getViewNode(document, "appMenu-quit-button2").insertAdjacentElement("afterend",restartButton);
}())
