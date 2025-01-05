import { ArrayMinSize, IsArray, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
// import { SuscriptionTypeList } from "../enums/suscription.enum";
// import { SuscriptionType } from "@prisma/client";

export class CreateSuscriptionDto{
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    // @IsEnum( SuscriptionTypeList,{
    //     message: "Valid status are " + SuscriptionTypeList
    // }
    // )
    // type: SuscriptionType;

    @IsString()
    description: string;

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    features: string[];

    //Relations
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    traders: string[];


}