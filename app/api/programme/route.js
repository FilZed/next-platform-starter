import { NextResponse } from 'next/server';

// GET: Recupera i dati da Airtable
export async function GET() {
  try {
    // Log delle variabili d'ambiente (mascherate per sicurezza)
    console.log('AIRTABLE_BASE_ID exists:', !!process.env.AIRTABLE_BASE_ID);
    console.log('AIRTABLE_ACCESS_TOKEN exists:', !!process.env.AIRTABLE_ACCESS_TOKEN);
    
    const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Sessions`;
    console.log('Fetching from URL:', url);

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Airtable API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Log della struttura dei dati (senza contenuti sensibili)
    console.log('Data structure:', {
      hasRecords: !!data.records,
      recordCount: data.records?.length
    });

    return NextResponse.json({ 
      success: true, 
      data: data.records 
    });
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        time: new Date().toISOString()
      }, 
      { status: 500 }
    );
  }
}
