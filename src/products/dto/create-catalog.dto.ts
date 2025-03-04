import { Type } from "class-transformer";
import { ArrayMinSize, arrayMinSize, IsArray, IsNumber, IsOptional, IsPositive, IsString, Min, ValidateNested } from "class-validator";
import { CreateProductDto } from "./create-product.dto";

export class CreateCatalogDto {
    @IsString()
    storeId: string

    @IsString()
    name: string
    
    @IsString()
    description: string

    @IsNumber()
    discount: number

    @IsNumber()
    @IsOptional()
    @Min(0)
    productsAmount: number

  //Relations
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    @Type( () => CreateProductDto)
    products: CreateProductDto[]
}