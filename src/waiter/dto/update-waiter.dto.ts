import { PartialType } from '@nestjs/mapped-types';
import { CreateWaiterPayload } from './create-waiter.dto';

export class UpdateWaiterDto extends PartialType(CreateWaiterPayload) {}
