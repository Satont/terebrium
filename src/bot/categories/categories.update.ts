import { UseInterceptors } from '@nestjs/common';
import { Update } from 'nestjs-telegraf';
import { ResponseTimeInterceptor } from '../commons/response-time.interceptor';

@Update()
@UseInterceptors(ResponseTimeInterceptor)
export class CategoriesUpdate {}
