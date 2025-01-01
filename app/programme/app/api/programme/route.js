'use client'

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Clock, MapPin, User } from 'lucide-react';

async function fetchAirtableData() {
  try {
    const response = await fetch('/api/programme');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default function Programme() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAirtableData();
      setSessions(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light mb-4 text-[#c0846f]">
            Conference Programme
          </h1>
          <h2 className="text-2xl text-gray-400 font-light mb-6">
            Forging Digital Money in the Tokenization Era
          </h2>
          <div className="flex items-center justify-center gap-3 text-gray-300 mb-2">
            <Clock className="w-5 h-5" />
            <span className="font-light">Florence, May 8-9-10, 2025</span>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-400">Loading programme...</div>
        ) : (
          <div className="grid gap-6">
            {sessions.map((session, index) => (
              <Card key={index} className="bg-black/40 backdrop-blur border border-gray-800">
                <CardHeader>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-light text-[#c0846f]">
                          {session.title}
                        </h3>
                        <div className="inline-flex items-center mt-2 border border-gray-700 px-3 py-1 rounded-sm">
                          <span className="text-sm text-gray-400 uppercase tracking-wider">
                            {session.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          session.confirmed ? 'bg-[#c0846f]' : 'bg-gray-600'
                        }`} />
                        <span className="text-sm text-gray-500">
                          {session.confirmed ? 'Confirmed' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 text-gray-400">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-[#c0846f]" />
                      <span>{session.startTime} - {session.endTime}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-[#c0846f]" />
                      <span>{session.location}</span>
                    </div>
                    {session.speaker && (
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-[#c0846f]" />
                        <span>{session.speaker}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
