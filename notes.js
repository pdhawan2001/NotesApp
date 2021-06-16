const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
    const notes = loadNotes(); //taking loadnotes from below function
    const duplicateNote = notes.find((note) => note.title === title) //means no duplicacy is there and stops when found, will not search the remaining 
  

    if (!duplicateNote) {
        notes.push({
            //push method of arrays
            title: title, //representing each note as an object as title and body property
            body: body,
        });
        console.log(chalk.green.inverse("New note added!"));
        saveNotes(notes); //calling saveNotes to save the notes
    } else {
        //if duplicate note is found
        console.log(chalk.red.inverse("Note title taken"));
    }
};

const saveNotes = (notes) => {
    //to save the notes that are added, here we are stringify data and save it to thee fs
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON); //we are writing what is stored in dataJSON function above
};

const loadNotes = () => {
    //will be used to load notes
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse("Note Removed!"));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red.inverse("No note found!"));
    }
};

const listNotes = () => {
    const notes = loadNotes()
    notes.forEach((note) => {
        console.log(note.title)
    })
    console.log(chalk.bgYellow("Your notes"));
};

const readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.blueBright.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.bgRed("Note not found!"))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
};
