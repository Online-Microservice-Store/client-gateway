import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNumber, IsOptional, IsPositive, IsString, Min, ValidateNested } from "class-validator";
import { CreateStockDto } from "src/products/dto";

export class CreateProductDto{
    @IsString()
    name: string

    @IsString()
    brand: string

    @IsString()
    description: string

    @IsNumber()
    @Min(0)
    price: number;

    @IsString()
    code: string;

    @IsNumber()
    @IsPositive()
    discount: number;

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    @Type( () => CreateStockDto)
    stocks: CreateStockDto[]

    @IsString()
    catalogId: string
}