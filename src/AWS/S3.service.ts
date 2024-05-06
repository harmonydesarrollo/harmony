import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
      region: process.env.region,
    });
  }

  async uploadFile(bucketName: string, fileName: string, file: Buffer): Promise<string> {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: file,
    };
    const data = await this.s3.upload(params).promise();
    return data.Location;
  }

  async updateFile(fileUrl: string, newFileContent: Buffer): Promise<string> {
    // Parsea la URL de S3 para obtener el bucket y la clave del archivo
    const urlParts = fileUrl.split('/');
    const bucketName = urlParts[3];
    const key = urlParts.slice(4).join('/');

    // Decodifica la clave del archivo para manejar la diferencia en la codificación
    const decodedKey = decodeURIComponent(key);

    const params = {
      Bucket: bucketName,
      Key: decodedKey,
      Body: newFileContent,
    };
    const data = await this.s3.upload(params).promise();
    return data.Location;
  }
}
