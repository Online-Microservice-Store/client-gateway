import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateStoreTraderDto } from "./create-store-trader.dto";
import { CreateCatalogDto } from "./create-catalog.dto";

export class CreateStoreDto{
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    vision: string;

    @IsString()
    mision: string;

    @IsString()
    logo: string;

    @IsString()
    views: string;

    @IsString()
    ubication: string;

    // @IsOptional()
    // @IsArray()
    // @ArrayMinSize(1)
    // @ValidateNested({each: true})
    // @Type( () => CreateCatalogDto)
    // catalogs: CreateCatalogDto[]
    
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    @Type( () => CreateStoreTraderDto)
    storeTraders: CreateStoreTraderDto[]
}