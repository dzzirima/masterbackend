import mongoose from "mongoose"

const NoteSchema = new mongoose.Schema({
    noteTitle:String,
    noteType:String,
    noteKeyboard:String,
    noteSummary:String,
    noteBody:String,
    
})

const Note = mongoose.model("Note",NoteSchema)
export default Note

