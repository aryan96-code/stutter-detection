import { TrendingDown, Award } from 'lucide-react';

export default function Comparison() {
  return (
    <div className="screen">
      <div className="card text-center mb-3" style={{ background: 'var(--primary)', color: 'white' }}>
        <Award size={48} style={{ margin: '0 auto 0.5rem' }} />
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Great Progress!</h2>
        <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>Your training sessions are showing positive results.</p>
      </div>

      <h3 className="mb-2">Pre-Stutter Events</h3>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="card text-center" style={{ border: '2px solid #e2e8f0' }}>
          <div className="text-muted mb-1">Before Training</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--pre-stutter)' }}>15</div>
          <div className="text-muted" style={{ fontSize: '0.8rem' }}>Events / Hour</div>
        </div>
        
        <div className="card text-center" style={{ border: '2px solid var(--normal)' }}>
          <div className="text-muted mb-1">After Training</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--normal)' }}>4</div>
          <div className="text-muted" style={{ fontSize: '0.8rem' }}>Events / Hour</div>
        </div>
      </div>

      <div className="card flex items-center justify-center gap-2 mb-3" style={{ backgroundColor: 'var(--normal-bg)', color: 'var(--normal)' }}>
        <TrendingDown size={24} />
        <strong style={{ fontSize: '1.1rem' }}>73% Reduction in Events</strong>
      </div>
      
      <div className="card">
        <h3 className="mb-2 text-center">Consistency Metric</h3>
        <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.5rem' }}>
          <div style={{ width: '85%', height: '100%', background: 'var(--primary)', borderRadius: '4px' }}></div>
        </div>
        <div className="flex justify-between text-muted text-sm">
          <span>Starting Base</span>
          <span>85% Fluency</span>
        </div>
      </div>
    </div>
  );
}
