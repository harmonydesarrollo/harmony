import { Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './S3.service';

@Controller('files')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    try {
      const fileUrl = await this.s3Service.uploadFile('bucket-harmony', file.originalname, file.buffer);
      return { success: true, message: 'Archivo subido correctamente', fileUrl };
    } catch (error) {
      return { success: false, message: 'Error al subir el archivo', error };
    }
  }

  @Post('update')
  @UseInterceptors(FileInterceptor('file'))
  async updateFile(@UploadedFile() file, @Param('fileUrl') fileUrl: string) {
    try {
      const updatedFileUrl = await this.s3Service.updateFile(fileUrl, file.buffer);
      return { success: true, message: 'Archivo actualizado correctamente', updatedFileUrl };
    } catch (error) {
      return { success: false, message: 'Error al actualizar el archivo', error };
    }
  }
}
