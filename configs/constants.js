export const LAMBDA_CONFIG = {
  region: process.env.AWS_REGION || "us-east-1",
  functionName: process.env.REMOTION_LAMBDA_FUNCTION_NAME || "remotion-render-4-0-220-mem2048mb-disk2048mb-120sec",
};

export const FIREBASE_CONFIG = {
  storagePath: "video-files",
  videoContentType: "video/mp4",
};

export const API_ROUTES = {
  CHECK_RENDER_STATUS: "/api/check-render-status",
  WEBHOOK: "/api/webhook",
};

export const VIDEO_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
}; 