async function getData() {
  const res = await fetch('https://bic25-programme.netlify.app/api/programme', { 
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Programme() {
  const sessions = await getData();

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light mb-4 text-[#c0846f]">
            Conference Programme
          </h1>
          <h2 className="text-2xl text-gray-400 font-light mb-6">
            III BABEL International Conference
          </h2>
          <div className="text-gray-300 mb-2">
            <span className="font-light">Florence, May 8-9-10, 2025</span>
          </div>
        </div>

        <div className="space-y-6">
          {sessions.map((session, index) => (
            <div 
              key={index}
              className="bg-black/40 backdrop-blur border border-gray-800 rounded-lg p-6"
            >
              <div className="space-y-4">
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
                
                <div className="grid gap-2 text-gray-400">
                  <div className="flex items-center gap-3">
                    <span>{session.startTime} - {session.endTime}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>{session.location}</span>
                  </div>
                  {session.speaker && (
                    <div className="flex items-center gap-3">
                      <span>{session.speaker}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
