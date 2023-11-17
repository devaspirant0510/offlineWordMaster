class DBManager {
	static dbname = 'wordDictionary';
	static storeName = 'myWords';
	static WORD_NAME_INDEX = 'wordNameIndex';

	constructor() {
		this.initializeDB();
	}

	openDB(): IDBOpenDBRequest {
		return indexedDB.open(DBManager.dbname, 1);
	}

	/**
	 * 처음 실핼할때 DBManager.storeName 에 해당하는 Store 가 존재하지 않을때 스토어 생성
	 */
	initializeDB() {
		const request = this.openDB();
		request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
			console.log(e);
			const db = request.result;
			if (!db.objectStoreNames.contains(DBManager.storeName)) {
				const store = db.createObjectStore(DBManager.storeName, { keyPath: 'id', autoIncrement: true });
				store.createIndex(DBManager.WORD_NAME_INDEX, 'wordName', { unique: true });
			}
		};
	}

	async transactionMapper<T>(request:IDBRequest):Promise<T> {
		return new Promise<T>((resolve, reject) => {
			request.onsuccess = () => {
				resolve(request.result);
			};
			request.onerror = () => {
				reject(request.error);
			};
		});
	}

	async getObjectStore():Promise<IDBObjectStore> {
		const req = await this.openDB();
		const db = await this.transactionMapper<IDBDatabase>(req);
		const tr = db.transaction([DBManager.storeName], "readwrite");
		return tr.objectStore(DBManager.storeName);
	}

	async openDatabase() {
		const request = indexedDB.open(DBManager.dbname, 1);
		const openDB = () => {
			return new Promise<IDBDatabase>((resolve, reject) => {
				request.onsuccess = () => {
					resolve(request.result);
				};
				request.onerror = () => {
					reject(new Error('failed to open Database'));
				};
			});
		};
		return openDB();
	}
}

export default DBManager;
