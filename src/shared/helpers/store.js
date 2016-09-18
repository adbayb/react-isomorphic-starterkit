class Store {
	static createStore(data) {
		Store.data = data;
	}

	static getStore() {
		return Store.data;
	}

	static registerPromise(promise) {
		Store.promises.push(promise);
	}

	static getPromises() {
		return Store.promises;
	}
}

Store.promises = [];

export {
	Store
};