// import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { S3Service } from './S3.service';

// @Controller('files')
// export class S3Controller {
//   constructor(private readonly s3Service: S3Service) {}

//   @Post('upload')
//   @UseInterceptors(FileInterceptor('file', {
//     limits: {
//       fileSize: 5 * 1024 * 1024, // ✅ Límite aumentado a 5MB
//     },
//   }))
//   async uploadFile(@UploadedFile() file: Express.Multer.File) {
//     try {
//       const fileUrl = await this.s3Service.uploadFile('harmony-web', file.originalname, file.buffer);
//       return { success: true, message: 'Archivo subido correctamente', fileUrl };
//     } catch (error) {
//       return { success: false, message: 'Error al subir el archivo', error };
//     }
//   }

//   @Post('update')
//   @UseInterceptors(FileInterceptor('file', {
//     limits: {
//       fileSize: 5 * 1024 * 1024, // ✅ Límite aumentado a 5MB
//     },
//   }))
//   async updateFile(
//     @UploadedFile() file: Express.Multer.File,
//     @Body('fileUrl') fileUrl: string,
//   ) {
//     try {
//       const updatedFileUrl = await this.s3Service.updateFile(fileUrl, file.buffer);
//       return { success: true, message: 'Archivo actualizado correctamente', updatedFileUrl };
//     } catch (error) {
//       return { success: false, message: 'Error al actualizar el archivo', error };
//     }
//   }
// }


import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './S3.service';

const fileInterceptorOptions = {
  limits: {
    fileSize: 5 * 1024 * 1024, // ✅ Máximo 5MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Solo se permiten archivos de imagen'), false);
    }
    cb(null, true);
  },
};

@Controller('files')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', fileInterceptorOptions))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { success: false, message: 'No se recibió ningún archivo' };
    }

    try {
      const fileUrl = await this.s3Service.uploadFile(
        'harmony-web',
        file.originalname,
        file.buffer,
      );
      return {
        success: true,
        message: 'Archivo subido correctamente',
        fileUrl,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al subir el archivo',
      };
    }
  }

  @Post('update')
  @UseInterceptors(FileInterceptor('file', fileInterceptorOptions))
  async updateFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('fileUrl') fileUrl: string,
  ) {
    if (!file) {
      return { success: false, message: 'No se recibió ningún archivo' };
    }

    try {
      const updatedFileUrl = await this.s3Service.updateFile(
        fileUrl,
        file.buffer,
      );
      return {
        success: true,
        message: 'Archivo actualizado correctamente',
        updatedFileUrl,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al actualizar el archivo',
      };
    }
  }
}
