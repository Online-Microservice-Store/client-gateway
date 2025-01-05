import { IsString } from "class-validator";

export class CreateStoreInvoiceDto{
    @IsString()
    invoiceId: string;

    @IsString()
    storeId: string;
}