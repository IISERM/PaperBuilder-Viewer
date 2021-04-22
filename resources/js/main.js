window.myApp = {
  updateView: async () => {
    console.log("triggered");
    await Neutralino.filesystem.writeFile({
      fileName: './live.md',
      data: document.getElementById("editor").value
    });
    let response = await Neutralino.os.execCommand({
      command: 'pandoc -t html -i live.md --mathjax -s -M document-css=true --highlight-style breezedark --css content.css'
    });
    console.log(response.stdout);
    document.getElementById("viewer").srcdoc = response.stdout;
  },
  handleKeyPress: (ev) => {
    if (ev.ctrlKey) {
      switch (ev.key) {
        case 'l': window.myApp.updateView();
      }
    }
  }
};

Neutralino.init();
console.log("started");
document.getElementById("editor").addEventListener("keydown", window.myApp.handleKeyPress)
