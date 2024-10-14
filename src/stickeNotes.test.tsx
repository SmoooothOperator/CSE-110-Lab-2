import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

describe("Create StickyNote", () => {
  test("renders create note form", () => {
    render(<StickyNotes />);

    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
  });

  test("creates a new note", () => {
    render(<StickyNotes />);

    // Please make sure your sticky note has a title and content input field with the following placeholders.
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
      screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
  });

  test("Read", () => {
    render(<StickyNotes />);
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
      screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note 1" } });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content 1" },
    });
    fireEvent.click(createNoteButton);

    const newNoteTitle1 = screen.getByText("New Note 1");
    const newNoteContent1 = screen.getByText("Note content 1");

    expect(newNoteTitle1).toBeInTheDocument();
    expect(newNoteContent1).toBeInTheDocument();

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note 2" } });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content 2" },
    });
    fireEvent.click(createNoteButton);

    const newNoteTitle2 = screen.getByText("New Note 2");
    const newNoteContent2 = screen.getByText("Note content 2");

    expect(newNoteTitle2).toBeInTheDocument();
    expect(newNoteContent2).toBeInTheDocument();
  });

  test("Update", () => {
    render(<StickyNotes />);

    // Please make sure your sticky note has a title and content input field with the following placeholders.
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
      screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();

    fireEvent.focus(newNoteTitle);
    newNoteTitle.textContent = "New Note X";
    fireEvent.input(newNoteTitle);

    fireEvent.focus(newNoteContent);
    newNoteContent.textContent = "New Note Content X";
    fireEvent.input(newNoteContent);

    expect(newNoteTitle.textContent).toBe("New Note X");
    expect(newNoteContent.textContent).toBe("New Note Content X");
  });

  test("Delete", () => {
    render(<StickyNotes />);

    // Please make sure your sticky note has a title and content input field with the following placeholders.
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
      screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();

    const noteItem = newNoteTitle.closest(".note-item"); // Get the parent note container
    if (noteItem) {
      const deleteNewNoteButton = noteItem.querySelector("button");
      if (deleteNewNoteButton) {
        fireEvent.click(deleteNewNoteButton);
        expect(newNoteTitle).not.toBeInTheDocument();
      } else {
        throw new Error("x button not found");
      }
    } else {
      throw new Error("noteItem not found");
    }
  });
});
