import { NextResponse } from 'next/server';

// GET: Recupera i dati da Airtable
export async function GET() {
  try {
    const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Sessions`, {
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();

    return NextResponse.json({ 
      success: true, 
      data: data.records 
    });
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch data' 
      }, 
      { status: 500 }
    );
  }
}
