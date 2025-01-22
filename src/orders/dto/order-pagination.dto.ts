import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common";
import { OrderStatus, OrderStatusList } from "../enum/order-status.enum";

export class OrderPaginationDto extends PaginationDto{
    @IsOptional()
    @IsEnum( OrderStatusList , {
        message: "Valid status list are " + OrderStatusList
    })
    status: OrderStatus;

}