import { PartialType } from "@nestjs/mapped-types";
import { CreateNotificationDto } from "./create-notification.dto";
import { IsString } from "class-validator";

export class UpdateNotificationDto extends PartialType(CreateNotificationDto){
}