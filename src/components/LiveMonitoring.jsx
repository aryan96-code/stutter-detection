import { useState, useEffect } from 'react';
import { Heart, Droplet, Mic as MicIcon, Activity } from 'lucide-react';

export default function LiveMonitoring() {
  const [data, setData] = useState({
    bpm: 72,
    gsr: 3.2,
    speech: 45,
    motion: 'Low'
  });
  
  const [status, setStatus] = useState('NORMAL');
  const [isAlertActive, setIsAlertActive] = useState(false);

  useEffect(() => {
    let tick = 0;
    
    const interval = setInterval(() => {
      tick += 1;
      
      // Simulate a cycle: Normal -> Stress -> Pre-Stutter -> Normal
      const cyclePhase = tick % 20; 
      
      let newBpm = 70 + Math.random() * 10;
      let newGsr = 2 + Math.random() * 2;
      let newSpeech = 30 + Math.random() * 30;
      let newMotion = 'Low';
      
      if (cyclePhase > 10 && cyclePhase <= 15) {
        // Stress phase
        newBpm = 85 + Math.random() * 15;
        newGsr = 5 + Math.random() * 3;
        newMotion = 'Medium';
      } else if (cyclePhase > 15) {
        // Pre-Stutter phase
        newBpm = 100 + Math.random() * 20;
        newGsr = 8 + Math.random() * 4;
        newSpeech = 10 + Math.random() * 20; // Hesitation
        newMotion = 'High';
      }
      
      setData({
        bpm: Math.round(newBpm),
        gsr: newGsr.toFixed(1),
        speech: Math.round(newSpeech),
        motion: newMotion
      });
      
      // Determine status based on values
      if (newBpm > 95 && newGsr > 7) {
        setStatus('PRE-STUTTER');
        setIsAlertActive(true);
      } else if (newBpm > 85 || newGsr > 5) {
        setStatus('STRESS');
        setIsAlertActive(false);
      } else {
        setStatus('NORMAL');
        setIsAlertActive(false);
      }
      
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'PRE-STUTTER': return 'var(--pre-stutter)';
      case 'STRESS': return 'var(--stress)';
      default: return 'var(--normal)';
    }
  };

  const getStatusBg = () => {
    switch (status) {
      case 'PRE-STUTTER': return 'var(--pre-stutter-bg)';
      case 'STRESS': return 'var(--stress-bg)';
      default: return 'var(--normal-bg)';
    }
  };

  return (
    <div className="screen">
      {isAlertActive && (
        <div className="card mb-3" style={{ backgroundColor: 'var(--pre-stutter-bg)', color: 'var(--pre-stutter)', border: '2px solid var(--pre-stutter)', animation: 'pulse 1.5s infinite' }}>
          <strong>⚠️ ALERT ACTIVE:</strong> Pre-stutter patterns detected. Try to take a deep breath.
        </div>
      )}

      <div className="card text-center mb-3" style={{ backgroundColor: getStatusBg(), transition: 'background-color 0.5s ease' }}>
        <h3 className="text-muted mb-1">Current Prediction</h3>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: getStatusColor() }}>
          {status === 'NORMAL' && '🟢 NORMAL'}
          {status === 'STRESS' && '🟡 STRESS'}
          {status === 'PRE-STUTTER' && '🔴 PRE-STUTTER'}
        </div>
      </div>

      <h3 className="mb-2">Real-time Sensor Data</h3>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="card text-center">
          <Heart size={32} color="#ef4444" style={{ margin: '0 auto 0.5rem' }} />
          <div className="text-muted mb-1">Heart Rate</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{data.bpm} <span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>BPM</span></div>
        </div>
        
        <div className="card text-center">
          <Droplet size={32} color="#3b82f6" style={{ margin: '0 auto 0.5rem' }} />
          <div className="text-muted mb-1">GSR (Stress)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{data.gsr} <span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>µS</span></div>
        </div>
        
        <div className="card text-center">
          <MicIcon size={32} color="#8b5cf6" style={{ margin: '0 auto 0.5rem' }} />
          <div className="text-muted mb-1">Speech Act.</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{data.speech}%</div>
        </div>
        
        <div className="card text-center">
          <Activity size={32} color="#f59e0b" style={{ margin: '0 auto 0.5rem' }} />
          <div className="text-muted mb-1">Motion</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{data.motion}</div>
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
      `}</style>
    </div>
  );
}
