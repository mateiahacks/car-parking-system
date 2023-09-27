import * as bcrypt from 'bcrypt';
import { Reservation } from 'src/typeorm';

export async function hashPassword(rawPassword: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(rawPassword, salt);
}

export function isCurrentlyReserved(reservations: Reservation[]) {
    const last = reservations[reservations.length - 1];

    if (!last) 
        return false;

    return new Date(last.expiration_date) > new Date();
}