import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { createParkingDto } from 'src/admin/dto/CreateParkingDto';

@Injectable()
export class ValidateCreateParkingPipe implements PipeTransform {
  transform(value: createParkingDto, metadata: ArgumentMetadata) {
    const costToInt = parseInt(value.cost.toString());
    if (isNaN(costToInt)) {
      throw new HttpException(
        'Invalid data type for cost. Expected number',
        HttpStatus.BAD_REQUEST
      )
    }
    return { ...value, cost: costToInt };
  }
}
