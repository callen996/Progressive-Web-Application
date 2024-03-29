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

export const putDb = async (content) => {
  console.log('putDb is saving data');
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({id: 1, value: content});
  const result = await request;
  console.log("data saved: ", result.value);
}
export const getDb = async () => {
  console.log('getDb is reading data');
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.get(1);
  const result = await request;
  if (result) {
    console.log("data found: ", result.value);
    return result.value;
  } else {
    console.log("data not found");
    return;
  }
}
initdb();
