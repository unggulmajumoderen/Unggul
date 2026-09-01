import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

// Gunakan token dengan akses Write untuk bisa menambah data
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(request: Request) {
  try {
    if (!process.env.SANITY_API_TOKEN) {
      return NextResponse.json(
        { message: 'Server configuration error: Token tidak ditemukan' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { rating, message } = body;

    if (!rating || !message) {
      return NextResponse.json(
        { message: 'Rating dan Pesan wajib diisi' },
        { status: 400 }
      );
    }

    // Buat dokumen feedback baru di Sanity
    const newFeedback = await writeClient.create({
      _type: 'feedback',
      rating: Number(rating),
      message: String(message),
      isApproved: true, // Berubah pikiran: Langsung tampil secara default
      createdAt: new Date().toISOString(),
    });

    // Refresh halaman agar review baru langsung muncul tanpa harus nunggu cache
    revalidatePath('/');

    return NextResponse.json(
      { message: 'Berhasil mengirim feedback', id: newFeedback._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json(
      { message: 'Gagal mengirim feedback, coba lagi nanti.' },
      { status: 500 }
    );
  }
}
