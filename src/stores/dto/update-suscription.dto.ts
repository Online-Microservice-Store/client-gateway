import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";
import { CreateSuscriptionDto } from "./create-suscription.dto";

export class UpdateSuscriptionDto extends PartialType(CreateSuscriptionDto){
}