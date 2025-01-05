import { PartialType } from "@nestjs/mapped-types";
import { CreateStoreTraderDto } from "./create-store-trader.dto";
import { IsString } from "class-validator";

export class UpdateStoreTraderDto extends PartialType(CreateStoreTraderDto){
}