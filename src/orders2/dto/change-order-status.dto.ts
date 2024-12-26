import { IsEnum, IsUUID } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/order-status.enum";

export class ChangeOrderStatus{
    @IsUUID()
    id: string;

    @IsEnum(OrderStatusList, {
        message: "Valid status are " + OrderStatusList
    })
    status: OrderStatus
}