interface ApiResponse<T> {
	message: string;
	data: T;
}

interface Contact {
	id: string;
	firstName: string;
	lastName: string;
	age: number | string;
	photo: string;
}
