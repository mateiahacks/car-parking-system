import * as bcrypt from 'bcrypt';
import { Reservation } from 'src/typeorm';

export async function hashPassword(rawPassword: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(rawPassword, salt);
}

export function isCurrentlyReserved(reservations: Reservation[]) {
    for (const reservation of reservations) {
        const expiration_date = new Date(reservation.expiration_date);
        const now_date = new Date()

        if (now_date < expiration_date)
            return true;
    }       

    return false;
}