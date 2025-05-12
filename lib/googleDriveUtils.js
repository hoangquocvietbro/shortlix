import { drive } from '../configs/GoogleDriveConfig';

// Upload file lên Google Drive
export const uploadToGoogleDrive = async (file, fileName, mimeType) => {
  try {
    const fileMetadata = {
      name: fileName,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID], // ID của folder trên Google Drive
    };

    const media = {
      mimeType: mimeType,
      body: file,
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    });

    return {
      fileId: response.data.id,
      webViewLink: response.data.webViewLink,
    };
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    throw error;
  }
};

// Tạo public URL cho file
export const makeFilePublic = async (fileId) => {
  try {
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    const file = await drive.files.get({
      fileId: fileId,
      fields: 'webContentLink',
    });

    return file.data.webContentLink;
  } catch (error) {
    console.error('Error making file public:', error);
    throw error;
  }
};

// Xóa file từ Google Drive
export const deleteFromGoogleDrive = async (fileId) => {
  try {
    await drive.files.delete({
      fileId: fileId,
    });
    return true;
  } catch (error) {
    console.error('Error deleting from Google Drive:', error);
    throw error;
  }
}; 