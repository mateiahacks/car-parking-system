import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { UpdateParkingDto } from 'src/admin/dto/UpdateParkingDto';

@Injectable()
export class ValidateUpdateParkingPipe implements PipeTransform {
  transform(value: UpdateParkingDto, metadata: ArgumentMetadata) {
    if (!value.address && !value.name && !value.cost) {
      throw new HttpException("Provide least 1 field", HttpStatus.BAD_REQUEST);
    }

    if (value.cost) {
      const parsedToInt = parseInt(value.cost.toString());

      if(isNaN(parsedToInt)) {
        throw new HttpException('Invalid data type for cost. Expected number', HttpStatus.BAD_REQUEST);
      }

      return { ...value, cost: parsedToInt };
    }

    return value;
  }
}
