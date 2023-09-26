import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { createParkingDto } from 'src/admin/dto/CreateParkingDto';
import { UpdateParkingDto } from 'src/admin/dto/UpdateParkingDto';
import { AdminGuard } from 'src/admin/guards/admin.guard';
import { ValidateCreateParkingPipe } from 'src/admin/pipes/validate-create-parking/validate-create-parking.pipe';
import { ValidateUpdateParkingPipe } from 'src/admin/pipes/validate-update-parking/validate-update-parking.pipe';
import { ParkingService } from 'src/admin/services/parking/parking.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('admin/parking')
@UseGuards(AuthGuard, AdminGuard)
export class AdminController {
    constructor(
        private parkingService: ParkingService
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    createParking(@Body(ValidateCreateParkingPipe) createParkingDto: createParkingDto) {
        return this.parkingService.createParking(createParkingDto);
    }

    @Get()
    gerParkings() {
        return this.parkingService.getParkings();
    }

    @Delete(':id')
    deleteParking(
       @Param('id', ParseIntPipe) id: number, 
    ) 
    {
        return this.parkingService.deleteParking(id);
    }

    @Put(':id')
    updateParking(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidateUpdateParkingPipe) updateParkingDto: UpdateParkingDto,
    )
    {

        return this.parkingService.updateParking(id, updateParkingDto);
    }

}
