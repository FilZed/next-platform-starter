import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableId = 'tblZp4F4JaRh6WHsF';  // ID corretto dalla tua URL
    const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;
    
    console.log('Using Airtable API URL:', url);
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Airtable API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    
    return NextResponse.json({ 
      success: true, 
      data: data.records,
      _debug: {
        baseId: baseId ? `...${baseId.slice(-4)}` : null,
        hasToken: !!process.env.AIRTABLE_ACCESS_TOKEN
      }
    });
  } catch (error) {
    console.error('API Error:', error);
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
