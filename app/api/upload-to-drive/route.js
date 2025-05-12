import { NextResponse } from 'next/server';
import { drive } from '../../../configs/GoogleDriveConfig';
import { Readable } from 'stream';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    console.log('File received:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    const buffer = await file.arrayBuffer();
    const fileName = file.name;
    const mimeType = file.type;

    // Tạo file metadata
    const fileMetadata = {
      name: fileName,
    };

    console.log('Creating file with metadata:', fileMetadata);

    // Tạo readable stream từ buffer
    const stream = Readable.from(Buffer.from(buffer));

    // Upload file lên Google Drive
    const media = {
      mimeType: mimeType,
      body: stream,
    };

    console.log('Starting file upload...');
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, name, size, mimeType',
    });

    console.log('File uploaded successfully:', response.data);

    // Tạo public permission cho file
    console.log('Setting file permissions...');
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // Lấy public URL của file
    console.log('Getting file public URL...');
    const fileData = await drive.files.get({
      fileId: response.data.id,
      fields: 'id, name, size, mimeType, webContentLink',
    });

    console.log('File details:', fileData.data);

    return NextResponse.json({
      success: true,
      fileId: response.data.id,
      fileName: response.data.name,
      fileSize: response.data.size,
      mimeType: response.data.mimeType,
      publicUrl: fileData.data.webContentLink,
    });
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      errors: error.errors,
    });
    return NextResponse.json(
      { error: 'Failed to upload file', details: error.message },
      { status: 500 }
    );
  }
} 