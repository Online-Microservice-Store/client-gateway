import { PartialType } from "@nestjs/mapped-types";
import { CreateStoreInvoiceDto } from "./create-store-invoice.dto";
import { IsString } from "class-validator";

export class UpdateStoreInvoiceDto extends PartialType(CreateStoreInvoiceDto){
}