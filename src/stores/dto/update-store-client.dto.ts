import { PartialType } from "@nestjs/mapped-types";
import { CreateStoreClientDto } from "./create-store-client.dto";
import { IsString } from "class-validator";

export class UpdateStoreClientDto extends PartialType(CreateStoreClientDto){

}