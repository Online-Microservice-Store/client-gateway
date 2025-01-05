import { IsString } from "class-validator";

export class CreateStoreTraderDto{
    @IsString()
    traderId: string;

    @IsString()
    storeId: string;
}