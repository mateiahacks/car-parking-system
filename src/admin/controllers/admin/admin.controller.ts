import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { createParkingDto } from 'src/admin/dto/CreateParkingDto';
import { AdminGuard } from 'src/admin/guards/admin.guard';
import { ValidateCreateParkingPipe } from 'src/admin/pipes/validate-create-parking/validate-create-parking.pipe';
import { ParkingService } from 'src/admin/services/parking/parking.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('admin')
@UseGuards(AuthGuard, AdminGuard)
export class AdminController {
    constructor(
        private parkingService: ParkingService
    ) {}

    @Post('parking')
    @UsePipes(ValidationPipe)
    createParking(@Body(ValidateCreateParkingPipe) createParkingDto: createParkingDto) {
        return this.parkingService.createParking(createParkingDto);
    }

    @Get('parking')
    gerParkings() {
        return this.parkingService.getParkings();
    }

}
