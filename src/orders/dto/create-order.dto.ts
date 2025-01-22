import { IsDate, IsEnum, IsString } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/order-status.enum";
import { Type } from "class-transformer";

export class CreateOrderDto {
    @IsString()
    address: String;

    @IsString()
    coordinate: String

    @Type(() => Date) // Transforma automáticamente el string a Date
    @IsDate()
    deliveryTime: Date
    
    @IsEnum( OrderStatusList, {
        message: "Valid status are " + OrderStatusList
    })
    status: OrderStatus

    // @IsArray()
    // @ArrayMinSize(1)
    // //Valida cada item
    // @ValidateNested({each: true})
    // @Type( () => OrderItemDto)
    // items: OrderItemDto[]
}

