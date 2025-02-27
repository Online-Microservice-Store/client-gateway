import { PartialType } from "@nestjs/mapped-types";
import { CreateStoreDto } from "./create-store";
import { IsString } from "class-validator";

export class UpdateStoreDto extends PartialType(CreateStoreDto){
}