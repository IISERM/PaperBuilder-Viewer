window.myApp = {
    updateView: async () => {
        console.log("triggered");
        await Neutralino.filesystem.writeFile({
            fileName: './live.md',
            data: editor.value
        });
        let response = await Neutralino.os.execCommand({
            command: 'pandoc -t html -i live.md --mathjax -s -M document-css=true --highlight-style breezedark --css content.css'
        });
        console.log(response.stdout);
        viewer.srcdoc = response.stdout;
    },
    editorHKP: (ev) => {
        console.log("registered!");
        if (ev.ctrlKey) {
            switch (ev.key) {
                case 'l': window.myApp.updateView(); break;
                case 'k': viewer.focus(); break;
            }
        }
    },
    viewerHKP: (ev) => {
        console.log("registered!");
        if (ev.ctrlKey) {
            switch (ev.key) {
                case 'l': window.myApp.updateView(); break;
                case 'k': editor.focus(); break;
            }
        }
    }
};

Neutralino.init();
console.log("Started");
const editor = document.getElementById("editor");
const viewer = document.getElementById("viewer");
editor.addEventListener("keydown", window.myApp.editorHKP);
viewer.addEventListener("keydown", window.myApp.viewerHKP);
