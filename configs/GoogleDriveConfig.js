import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Kiểm tra các biến môi trường
if (!process.env.GOOGLE_DRIVE_CLIENT_EMAIL) {
  console.error('GOOGLE_DRIVE_CLIENT_EMAIL is not set');
}
if (!process.env.GOOGLE_DRIVE_PRIVATE_KEY) {
  console.error('GOOGLE_DRIVE_PRIVATE_KEY is not set');
}

// Khởi tạo JWT client với service account credentials
const auth = new JWT({
  email: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
  key: process.env.GOOGLE_DRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive',
  ],
});

// Khởi tạo Google Drive API client
const drive = google.drive({ 
  version: 'v3', 
  auth,
  timeout: 30000, // Tăng timeout lên 30 giây
});

// Kiểm tra kết nối
drive.files.list({
  pageSize: 1,
  fields: 'nextPageToken, files(id, name)',
})
.then(() => {
  console.log('Successfully connected to Google Drive API');
})
.catch((error) => {
  console.error('Error connecting to Google Drive API:', error);
});

export { drive }; 