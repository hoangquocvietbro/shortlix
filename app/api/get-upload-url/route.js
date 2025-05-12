import { NextResponse } from 'next/server';
import { drive } from 'configs/GoogleDriveConfig';

export async function POST(req) {
  try {
    const { fileName, mimeType } = await req.json();

    if (!fileName || !mimeType) {
      return NextResponse.json(
        { error: 'File name and mime type are required' },
        { status: 400 }
      );
    }

    // Tạo file metadata
    const fileMetadata = {
      name: fileName,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
    };

    // Tạo resumable upload session
    const res = await drive.files.create({
      resource: fileMetadata,
      media: {
        mimeType: mimeType,
      },
      fields: 'id',
      supportsAllDrives: true,
    });

    // Lấy upload URL
    const uploadUrl = `https://www.googleapis.com/upload/drive/v3/files/${res.data.id}?uploadType=resumable`;

    return NextResponse.json({
      success: true,
      fileId: res.data.id,
      uploadUrl,
    });
  } catch (error) {
    console.error('Error getting upload URL:', error);
    return NextResponse.json(
      { error: 'Failed to get upload URL' },
      { status: 500 }
    );
  }
} 