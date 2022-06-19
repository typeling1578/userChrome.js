(function () {
  const { OS } = ChromeUtils.import("resource://gre/modules/osfile.jsm");

  let userChrome_dir = Services.dirsvc.get("UChrm", Ci.nsIFile);
  if (userChrome_dir.exists()) {
    let userChromeFiles = userChrome_dir.directoryEntries;

    while (userChromeFiles.hasMoreElements()) {
      let userChromeFile = userChromeFiles.getNext().QueryInterface(Ci.nsIFile);
      let userChromeFile_name = userChromeFile.leafName;
      let userChromeFile_path = userChromeFile.path;
      if (userChromeFile_name.endsWith(".uc.js")) {
        let userChromeJS_elem = document.createElement("script");
        userChromeJS_elem.src = OS.Path.toFileURI(userChromeFile_path);
        document.documentElement.appendChild(userChromeJS_elem);
      }
    }
  }
}())
