import { Body, Controller, Get, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateReservationDto } from 'src/reservations/dto/CreateReservationDto';
import { ReservationsService } from 'src/reservations/services/reservations/reservations.service';

@Controller('reservations')
@UseGuards(AuthGuard)
export class ReservationsController {
    constructor(
        private reservationService: ReservationsService
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createReservation(
        @Body() createReservationDto: CreateReservationDto,
        @Request() res,
    ) {
        return await this.reservationService.createReservation(res.user.id, createReservationDto);
    }

    @Get()
    async getMyReservations(@Request() req) {
        return await this.reservationService.getMyReservations(req.user.id);
    }
}
