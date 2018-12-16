import delay from "./delay";
import { authors } from "../../tools/mockData";

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

// This would be performed on the server in a real app. Just stubbing in.
function generateId(author) {
  return author.firstName.toLowerCase() + "-" + author.lastName.toLowerCase();
}

export function getAllAuthors() {
  return new Promise(resolve => setTimeout(() => resolve([...authors]), delay));
}

export function saveAuthor(unsavedAuthor) {
  // clone to avoid mutating reference passed in.
  const author = { ...unsavedAuthor };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate server-side validation
      const minAuthorNameLength = 1;
      if (author.firstName.length < minAuthorNameLength) {
        reject(
          `First Name must be at least ${minAuthorNameLength} characters.`
        );
      }

      if (author.id) {
        const existingAuthorIndex = authors.findIndex(a => a.id == author.id);
        authors.splice(existingAuthorIndex, 1, author);
      } else {
        // Simulating creation here.
        // The server would generate author ids in a real app.
        author.id = generateId(author);
        authors.push(author);
      }

      resolve(author);
    }, delay);
  });
}

export function deleteAuthor(authorId) {
  return new Promise(resolve => {
    setTimeout(() => {
      const indexOfAuthorToDelete = authors.findIndex(
        author => author.id == authorId
      );
      authors.splice(indexOfAuthorToDelete, 1);
      resolve();
    }, delay);
  });
}
