import { NextResponse } from 'next/server';
import { drive } from '@/configs/GoogleDriveConfig';

export async function POST(req) {
  try {
    const { fileId } = await req.json();

    if (!fileId) {
      return NextResponse.json(
        { error: 'File ID is required' },
        { status: 400 }
      );
    }

    // Tạo public permission cho file
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // Lấy public URL của file
    const file = await drive.files.get({
      fileId: fileId,
      fields: 'webContentLink',
    });

    return NextResponse.json({
      success: true,
      publicUrl: file.data.webContentLink,
    });
  } catch (error) {
    console.error('Error making file public:', error);
    return NextResponse.json(
      { error: 'Failed to make file public' },
      { status: 500 }
    );
  }
} 