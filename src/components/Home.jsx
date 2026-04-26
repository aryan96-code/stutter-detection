import { useNavigate } from 'react-router-dom';
import { Activity, FileText, Mic, TrendingUp } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <div className="card text-center mb-3">
        <Activity size={48} className="mb-2" style={{ color: 'var(--primary)', margin: '0 auto' }} />
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Welcome Back</h2>
        <p className="text-muted">Your wearable is connected and ready to monitor your speech patterns.</p>
      </div>

      <div className="flex-col gap-3">
        <button className="btn btn-primary" onClick={() => navigate('/monitor')} style={{ padding: '1.5rem', fontSize: '1.1rem' }}>
          <Activity size={24} />
          Start Live Monitoring
        </button>
        
        <button className="btn btn-outline" onClick={() => navigate('/reports')}>
          <FileText size={20} />
          View Reports
        </button>
        
        <button className="btn btn-outline" onClick={() => navigate('/training')}>
          <Mic size={20} />
          Training Mode
        </button>

        <button className="btn btn-outline" onClick={() => navigate('/comparison')} style={{ borderColor: '#e2e8f0', color: 'var(--text-muted)' }}>
          <TrendingUp size={20} />
          View Progress
        </button>
      </div>
    </div>
  );
}
