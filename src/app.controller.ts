import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CadastroEmpresa } from './interface/cadastro-empresa';


@Controller()
export class AppController {
  private clienteAdminBackend: ClientProxy
  constructor(private readonly appService: AppService) {
    this.clienteAdminBackend = ClientProxyFactory.create({
      transport:Transport.RMQ,
      options:{
        urls: ['amqp://admin:123456@10.136.62.137:5672/'],
        queue: 'cadastro-empresa'
      }
    })

  }

  @Get()
  async getHello() {
    return await this.clienteAdminBackend.emit("ola","ola");
  }

  @Patch('atualizar-cadastro')
  async cadastroEmpresa(@Body() attCadastro: CadastroEmpresa){
    return await this.clienteAdminBackend.emit('cadastro-empresa', attCadastro)
  }
}
