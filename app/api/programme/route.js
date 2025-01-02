```javascript
import { NextResponse } from 'next/server';

// GET: Recupera i dati da Airtable
export async function GET() {
  try {
    const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Sessions`, {
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from Airtable');
    }

    const data = await response.json();
    
    // Transform Airtable data structure
    const formattedSessions = data.records.map(record => ({
      title: record.fields.Name || '',
      type: record.fields.Type || '',
      startTime: record.fields['Start Time'] || '',
      endTime: record.fields['End Time'] || '',
      location: record.fields.Location || '',
      speaker: record.fields.Speakers || '',
      confirmed: record.fields.Confirmed || false,
    }));

    return NextResponse.json(formattedSessions);
    
  } catch (error) {
    console.error('Error fetching Airtable data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

// POST: Riceve gli aggiornamenti da Make.com
export async function POST(request) {
  try {
    const data = await request.json();
    
    // Qui possiamo aggiungere la logica per gestire gli aggiornamenti
    console.log('Received update from Make.com:', data);
    
    // Per ora, rispondiamo con un successo
    return NextResponse.json({ 
      message: 'Update received successfully',
      data: data 
    });
    
  } catch (error) {
    console.error('Error processing update:', error);
    return NextResponse.json({ 
      error: 'Failed to process update' 
    }, { 
      status: 500 
    });
  }
}
```