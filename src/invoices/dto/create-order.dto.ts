import { IsDate, IsEnum, IsString } from "class-validator";
import { Type } from "class-transformer";
import { OrderState, OrderStateList } from "../enums/order-status.enum";

export class CreateOrderDto {
    @IsString()
    address: String;

    @IsString()
    coordinate: String

    @Type(() => Date) // Transforma automáticamente el string a Date
    @IsDate()
    deliveryTime: Date
    
    @IsEnum( OrderStateList, {
        message: "Valid status are " + OrderStateList
    })
    status: OrderState

    // @IsArray()
    // @ArrayMinSize(1)
    // //Valida cada item
    // @ValidateNested({each: true})
    // @Type( () => OrderItemDto)
    // items: OrderItemDto[]
    @IsString()
    clientId: string;
}

