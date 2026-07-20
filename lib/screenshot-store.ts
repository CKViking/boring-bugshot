const databaseName = "boring-bugshot";
const databaseVersion = 1;
const storeName = "screenshots";

type StoredScreenshot = {
  id: string;
  blob: Blob;
  name: string;
  type: string;
  savedAt: string;
};

function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("Browser storage is not available."));
      return;
    }

    const request = indexedDB.open(databaseName, databaseVersion);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(storeName)) {
        database.createObjectStore(storeName, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Could not open browser storage."));
  });
}

function waitForTransaction(transaction: IDBTransaction) {
  return new Promise<void>((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onabort = () => reject(transaction.error || new Error("Browser storage transaction was cancelled."));
    transaction.onerror = () => reject(transaction.error || new Error("Browser storage transaction failed."));
  });
}

export async function saveScreenshot(id: string, screenshot: File) {
  const database = await openDatabase();
  try {
    const transaction = database.transaction(storeName, "readwrite");
    const completed = waitForTransaction(transaction);
    const storedScreenshot: StoredScreenshot = {
      id,
      blob: screenshot,
      name: screenshot.name,
      type: screenshot.type,
      savedAt: new Date().toISOString(),
    };
    transaction.objectStore(storeName).put(storedScreenshot);
    await completed;
  } finally {
    database.close();
  }
}

export async function getScreenshot(id: string) {
  const database = await openDatabase();
  try {
    const transaction = database.transaction(storeName, "readonly");
    const completed = waitForTransaction(transaction);
    const request = transaction.objectStore(storeName).get(id);
    const storedScreenshot = await new Promise<StoredScreenshot | undefined>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result as StoredScreenshot | undefined);
      request.onerror = () => reject(request.error || new Error("Could not read the saved screenshot."));
    });
    await completed;
    if (!storedScreenshot) return null;

    return new File([storedScreenshot.blob], storedScreenshot.name, {
      type: storedScreenshot.type || storedScreenshot.blob.type,
      lastModified: new Date(storedScreenshot.savedAt).getTime(),
    });
  } finally {
    database.close();
  }
}

export async function deleteScreenshot(id: string) {
  const database = await openDatabase();
  try {
    const transaction = database.transaction(storeName, "readwrite");
    const completed = waitForTransaction(transaction);
    transaction.objectStore(storeName).delete(id);
    await completed;
  } finally {
    database.close();
  }
}
