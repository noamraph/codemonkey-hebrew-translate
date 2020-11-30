function main() {
    function translateWord(word) {
        const audio = new Audio('https://noamraph.github.io/codemonkey-hebrew-translations/' + word + '.mp3');
        audio.play().catch(e => {
            console.log("Didn't find word " + word + ".");

            // Update my google form with the missing word
            const formData = new FormData();
            formData.append("entry.686833565", word);
            var request = new XMLHttpRequest();
            request.open("POST", 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfQpEUkk1pO8lPPQBYinBzBd0tuMnJKWHMI0n5frNPJxajt0A/formResponse');
            request.send(formData);

            const audioErr = new Audio('https://noamraph.github.io/codemonkey-hebrew-translations/error.mp3');
            audioErr.play();
        });
    }

    const editor = document.querySelector(".ace_editor").env.editor;
    editor.container.addEventListener("contextmenu", function(e) {
        e.preventDefault();
        const range = editor.selection.getWordRange();
        const s = editor.getValue();
        const lines = s.split('\n');
        console.assert(range.start.row === range.end.row);
        const word0 = lines[range.start.row].slice(range.start.column, range.end.column);
        const word = word0.split('[')[0].split('(')[0];
        if (!/^[a-zA-Z_]+$/.test(word)) {
            // Not a word, ignore
            return false;
        }
        translateWord(word);
        return false;
    }, false);

    const buttons = document.querySelectorAll(".game-method");
    buttons.forEach(elem => elem.addEventListener("contextmenu", function(e) {
        e.preventDefault(); 
        translateWord(elem.innerText.trim());
        return false;
    }, false));

}

const script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
