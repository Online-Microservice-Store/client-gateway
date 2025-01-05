import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import { NotificationState, NotificationStateList } from "../enums/notification-state.enum";
import { NotificationPriority, NotificationPriorityList } from "../enums/notification-priority.enum";
import { Type } from "class-transformer";

export class CreateNotificationDto{
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsEnum( NotificationStateList, {
        message: "Valid types are: " + NotificationStateList
    })
    state: NotificationState;

    @Type(() => Date)
    @IsDate()
    date: Date

    @IsEnum( NotificationPriorityList, {
        message: "Valid types are: " + NotificationPriorityList
    })
    type: NotificationPriority

    //Relations
    @IsString()
    personId: string
    
}