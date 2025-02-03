import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoicePaginationDto } from './dto/invoice-pagination.dto';
import { UpdateInvoiceDto } from './dto';
import { PaginationDto } from 'src/common';
import { AuthGuardTrader } from 'src/auth/guards/authTrader.guard';

@Controller('invoices')
export class InvoicesController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client : ClientProxy
  ) {}

  @Post()
  async createInvoice(@Body() createInvoiceDto : CreateInvoiceDto){
    try {
      const invoice = await firstValueFrom(
        this.client.send('create_invoice', createInvoiceDto)
      );
      return invoice;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  

  @Get()
  async findAllInvoice(@Query() paginationDto : PaginationDto ){
    try {
      const invoices = await firstValueFrom(
        this.client.send('find_all_invoices', paginationDto)
      );
      return invoices;
    } catch (error) {
      throw new RpcException(error);
    }
  } 

  @Get('/id/:id')
  async findById(@Param('id', ParseUUIDPipe) id: string){
    try {
      const invoice = await firstValueFrom(
        this.client.send('find_one_invoice', {id})
      );
      return invoice;
    } catch (error) {
      throw new RpcException(error);
    }
  } 

  @Get('/client/:id')
  async findInvoicesByUserId(
    @Param('id') id:string,
    @Query() paginationDto: PaginationDto) {
    try {
      const invoices = await firstValueFrom(
        this.client.send('find_invoices_by_clientId', {id, ...paginationDto})
      );
      return invoices;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('/invoiceStore/:invoiceId')
  async findInvoicesStoreByUserId(
    @Param('invoiceId') invoiceId:string,
    @Query() paginationDto: PaginationDto) {
    try {
      const invoicesStore = await firstValueFrom(
        this.client.send('find_invoicesStore_by_clientId', {invoiceId, ...paginationDto})
      );
      return invoicesStore;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @UseGuards(AuthGuardTrader)
  @Get('/invoiceStore/store/:id')
  async getInvoicesStoreByUserId(
    @Param('id') id:string,
    @Query() paginationDto: PaginationDto) {
    try {
      const invoicesStore = await firstValueFrom(
        this.client.send('find_invoices_by_StoreId', {id, ...paginationDto})
      );
      return invoicesStore;
    } catch (error) {
      throw new RpcException(error);
    }
  }


  @Patch(':id')
  async editInvoice(
    @Param('id', ParseUUIDPipe) id : string,
    @Body() updateInvoiceDto : UpdateInvoiceDto
  ){
    try {
      return this.client.send('edit_invoice', {
        id,
        updateInvoiceDto
      })
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
