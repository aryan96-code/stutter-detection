import { FileText, Clock, AlertTriangle, Activity } from 'lucide-react';

export default function Reports() {
  return (
    <div className="screen">
      <div className="card mb-3">
        <h3 className="mb-2">Session Summary</h3>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-muted" />
            <span>Total Speech Duration</span>
          </div>
          <span style={{ fontWeight: '600' }}>45 mins</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} color="var(--stress)" />
            <span>Stress Events</span>
          </div>
          <span style={{ fontWeight: '600' }}>12</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} color="var(--pre-stutter)" />
            <span>Pre-Stutter Events</span>
          </div>
          <span style={{ fontWeight: '600' }}>4</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity size={20} color="var(--primary)" />
            <span>Average BPM</span>
          </div>
          <span style={{ fontWeight: '600' }}>82 BPM</span>
        </div>
      </div>

      <h3 className="mb-2">AI Insights</h3>
      <div className="flex-col gap-2">
        <div className="card" style={{ borderLeft: '4px solid var(--primary)', padding: '1rem' }}>
          <p>💡 "You tend to hesitate under pressure. Try to maintain a steady breathing rhythm when starting a new sentence."</p>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--normal)', padding: '1rem' }}>
          <p>📈 "Your speech is highly stable during reading exercises."</p>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--stress)', padding: '1rem' }}>
          <p>⚠️ "Stress levels increase noticeably during fast speech. Consider slowing down your pace."</p>
        </div>
      </div>
    </div>
  );
}
