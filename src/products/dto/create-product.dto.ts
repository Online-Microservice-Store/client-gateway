import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsNumber, IsOptional, IsPositive, IsString, IsUrl, Min, ValidateNested } from "class-validator";
import { CreateStockDto } from "./create-stock.dto";

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
    discount: number;

    @IsOptional()
    @IsBoolean()
    available: boolean;
    
    @IsOptional()
    @IsString()
    @IsUrl({}, { message: 'The image field must be a valid URL' })
    image?: string;

    @IsString()
    catalogId: string
    
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    @Type( () => CreateStockDto)
    stocks: CreateStockDto[]

    
}