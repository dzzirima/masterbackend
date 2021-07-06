import mongoose from "mongoose"

const NoteSchema = new mongoose.Schema({
    noteTitle:String,
    noteType:String,
    noteKeyboard:String,
    noteSummary:String,
    noteBody:String,
    noteDate:Date
    
})

const Note = mongoose.model("Note",NoteSchema)
export default Note

