import { NextResponse } from 'next/server';

// GET: Recupera i dati da Airtable
export async function GET() {
  try {
    const baseId = process.env.AIRTABLE_BASE_ID;
    // Prova con l'ID della vista invece dell'ID della tabella
    const url = `https://api.airtable.com/v0/${baseId}/viwuMMcN4Wm5lAf53`;
    
    console.log('Attempting to fetch from:', url);
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Airtable API error details:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        url: url.replace(baseId, 'BASE_ID') // Log sicuro dell'URL
      });
      throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return NextResponse.json({ 
      success: true, 
      data: data.records 
    });
  } catch (error) {
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
