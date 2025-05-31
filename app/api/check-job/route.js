import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DB_FILE = path.resolve('/tmp/jobs.json');

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('jobId');
    
    if (!jobId) {
      return NextResponse.json({ success: false, error: 'Missing jobId' }, { status: 400 });
    }

    let db = {};
    try {
      db = JSON.parse(await fs.readFile(DB_FILE, 'utf-8'));
    } catch (e) {
      return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 });
    }

    const job = db[jobId];
    if (!job) {
      return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, job });
  } catch (error) {
    console.error('Check job error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
} 