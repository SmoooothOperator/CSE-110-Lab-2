import React, { useState } from "react";
import "./App.css";
import { Label, Note } from "./folder/types";
import { dummyNotesList } from "./folder/constant";
import { ToggleTheme } from "./hooksExercise";
import { ToggleHeart } from "./hearthooks";
import { ThemeContext, themes } from "./themeContext";

export const StickyNotes = () => {
  // your code from App.tsx

  // State for set Note
  const [notes, setNotes] = useState(dummyNotesList);
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    favorite: false,
  };

  // State for createNote
  const [createNote, setCreateNote] = useState(initialNote);

  // Handler to add new note to the list
  const addNote = (newNote: Note) => {
    setNotes((notes) => [...notes, newNote]);
  };

  // Handler for note creation
  const createNoteHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newNote: Note = {
      ...createNote,
      id: notes.length + 1,
    };

    addNote(newNote);
  };

  // Handler for note deletion
  const deleteNoteHandler = (id: number) => {
    setNotes((notes) => notes.filter((note) => note.id != id));
  };

  // Callback function update favorite status of the note
  const isFavorite = (id: number) => {
    // change the favorite status of the note that got toggled
    setNotes((notes) =>
      notes.map((note) =>
        note.id === id ? { ...note, favorite: !note.favorite } : note
      )
    );
  };
  // States for themes
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  // Callback for toggling themes
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div className="app-container">
        <form
          className="note-form"
          onSubmit={createNoteHandler}
          style={{
            background: currentTheme.background,
            color: currentTheme.foreground,
          }}
        >
          <div>
            <input
              placeholder="Note Title"
              onChange={(event) =>
                setCreateNote({ ...createNote, title: event.target.value })
              }
              required
            ></input>
          </div>

          <div>
            <textarea
              onChange={(event) =>
                setCreateNote({ ...createNote, content: event.target.value })
              }
              required
            ></textarea>
          </div>

          <div>
            <select
              onChange={(event) =>
                setCreateNote({
                  ...createNote,
                  label: event.target.value as Label,
                })
              }
              required
            >
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
            </select>
          </div>

          <div>
            <button type="submit">Create Note</button>
          </div>
        </form>

        <div className="notes-grid">
          {notes.map((note) => (
            <div
              key={note.id}
              className="note-item"
              style={{
                background: currentTheme.background,
                color: currentTheme.foreground,
              }}
            >
              <div className="notes-header">
                <button onClick={() => deleteNoteHandler(note.id)}>x</button>

                <ToggleHeart
                  note={note}
                  isFavorite={isFavorite}
                />
              </div>
              <h2
                contentEditable="true"
                onBlur={(event) =>
                  setNotes((notes) =>
                    notes.map((n) =>
                      n.id === note.id
                        ? { ...n, title: event.target.innerText }
                        : n
                    )
                  )
                }
              >
                {" "}
                {note.title}{" "}
              </h2>
              <p
                contentEditable="true"
                onBlur={(event) =>
                  setNotes((notes) =>
                    notes.map((n) =>
                      n.id === note.id
                        ? { ...n, content: event.target.innerText }
                        : n
                    )
                  )
                }
              >
                {" "}
                {note.content}{" "}
              </p>
              <p
                contentEditable="true"
                onBlur={(event) =>
                  setNotes((notes) =>
                    notes.map((n) =>
                      n.id === note.id
                        ? { ...n, label: event.target.innerText as Label }
                        : n
                    )
                  )
                }
              >
                {" "}
                {note.label}{" "}
              </p>
            </div>
          ))}
        </div>
        <div>
          <h2>List of favorites:</h2>
          {notes.map((note) =>
            note.favorite === true ? <p>{note.title}</p> : null
          )}
        </div>
        <div>
          <ToggleTheme toggleTheme={toggleTheme} />
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
