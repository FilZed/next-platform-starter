import { NextResponse } from 'next/server';

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
    
    // Transform Airtable data structure to match our needs
    const formattedSessions = data.records.map(record => ({
      title: record.fields.Name || '',
      type: record.fields.Type || '',
      startTime: record.fields['Start Time'] || '',
      endTime: record.fields['End Time'] || '',
      location: record.fields.Location || '',
      speaker: record.fields.Speakers || '',
      confirmed: record.fields.Confirmed || false,
    }));

    // Sort sessions by start time
    formattedSessions.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    return NextResponse.json(formattedSessions);
    
  } catch (error) {
    console.error('Error fetching Airtable data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
