import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to database');
  // Creates database connection and version 1.
  const jateDb = await openDB('jate', 1);
  // Creates transaction on jate object in database. Readwrite parameter means that transaction can read and write data to object store.
  const tx = jateDb.transaction('jate', 'readwrite');
  // Retrieves reference and opens object store inside transaction.
  const store = tx.objectStore('jate');
  // Request is made using .put() method to put object into object store. Has an id of 1 and content is what was passed in as param.
  const request = store.put({ id: 1, value: content });
  // Waits for request promise to be completed.
  const result = await request;
  console.log('Data saved to database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // Retrieves all records from store.
  const request = store.getAll();
  const result = await request;
  console.log('Data from database', result);
  // If result is truthy, return result.value, otherwise return undefined.
  return result ? result.value : undefined;
};

initdb();
