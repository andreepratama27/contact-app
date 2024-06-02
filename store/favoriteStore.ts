import { create } from "zustand";

interface State {
	contacts: Contact[];
}

interface Action {
	setFavorite: (item: Contact) => void;
	removeFavorite: (id: string) => void;
	isFavorited: (id: string) => void;
}

const favoriteStore = create<State & Action>()((set, get) => ({
	contacts: [],
	setFavorite(item) {
		set((state) => ({
			contacts: [...state.contacts, item],
		}));
	},

	removeFavorite(id) {
		const filteredContact = get().contacts.filter((item) => item.id !== id);
		set((state) => ({
			contacts: filteredContact,
		}));
	},

	isFavorited(id): boolean {
		const filteredContact = get().contacts.filter((item) => item.id !== id);
		return !!filteredContact.length;
	},
}));

export { favoriteStore };
