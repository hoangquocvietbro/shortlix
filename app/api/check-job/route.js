import { NextResponse } from 'next/server';
import { db } from 'configs/db';
import { jobs } from 'configs/schema';
import { eq } from 'drizzle-orm';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('jobId');
    
    if (!jobId) {
      return NextResponse.json({ success: false, error: 'Missing jobId' }, { status: 400 });
    }

    const job = await db.select().from(jobs).where(eq(jobs.id, jobId));
    
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