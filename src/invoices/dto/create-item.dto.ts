import { IsNumber, IsOptional, Min, IsString, IsUUID } from "class-validator";

export class CreateItemDto{
    @IsString()
    productId: string;
    
    @IsNumber()
    @Min(0)
    amount: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    individualValue?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    totalValue?: number;

    @IsString()
    stockId: string;

}