import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator"

export class CadastroEmpresa {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    empresa_nome: String;
}