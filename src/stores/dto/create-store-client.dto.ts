import { IsString } from "class-validator";

export class CreateStoreClientDto{
    @IsString()
    clientId: string;

    @IsString()
    storeId: string;
}