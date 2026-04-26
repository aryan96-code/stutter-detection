import { Mic, BookOpen, Wind, Play } from 'lucide-react';

export default function TrainingMode() {
  return (
    <div className="screen">
      <div className="card mb-3">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={24} className="text-muted" />
          <h3 style={{ margin: 0 }}>Section 1: Slow Speaking Practice</h3>
        </div>
        <p className="text-muted mb-2">Read the following sentence slowly and clearly:</p>
        <div style={{ padding: '1rem', background: 'var(--primary-light)', borderRadius: '8px', fontStyle: 'italic', fontSize: '1.1rem', textAlign: 'center', fontWeight: '500' }}>
          "Communication is the key to success"
        </div>
      </div>

      <div className="card mb-3">
        <div className="flex items-center gap-2 mb-2">
          <Mic size={24} className="text-muted" />
          <h3 style={{ margin: 0 }}>Section 2: Difficult Words</h3>
        </div>
        <p className="text-muted mb-2">Practice pronouncing these complex words:</p>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
          <li>Entrepreneurship</li>
          <li>Psychological</li>
          <li>Communication Breakdown</li>
        </ul>
      </div>

      <div className="card mb-3">
        <div className="flex items-center gap-2 mb-2">
          <Wind size={24} className="text-muted" />
          <h3 style={{ margin: 0 }}>Section 3: Breathing Exercise</h3>
        </div>
        <p className="text-muted mb-2">Follow the breathing pattern before speaking:</p>
        <div style={{ textAlign: 'center', padding: '1rem', background: '#f1f5f9', borderRadius: '8px', fontWeight: 'bold' }}>
          Inhale (4s) → Hold (2s) → Speak slowly
        </div>
      </div>

      <button className="btn btn-primary" style={{ padding: '1rem', marginTop: '1rem' }}>
        <Play size={20} />
        Start Training Session
      </button>
    </div>
  );
}
