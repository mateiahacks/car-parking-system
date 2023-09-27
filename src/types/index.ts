
export interface User {
    id: number;
    firstname: string;
    lastname: string;
    personal_id: string;
    phone_number: string;
    balance: number;
}

export interface Car {
    id: number;
    name: string;
    state_number: string;
    type: string;
    owner: number;
}
