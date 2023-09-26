import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { createParkingDto } from 'src/admin/dto/CreateParkingDto';

@Injectable()
export class ValidateCreateParkingPipe implements PipeTransform {
  transform(value: createParkingDto, metadata: ArgumentMetadata) {
    const costToInt = parseInt(value.cost.toString());
    return { ...value, cost: costToInt };
  }
}
