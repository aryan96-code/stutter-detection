import { useState, useEffect } from 'react';
import { Heart, Droplet, Mic as MicIcon, Activity, AlertTriangle, Clock } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState({
    bpm: 82,
    gsr: 4.1,
    speech: 45,
    motion: 'Low'
  });
  
  const [status, setStatus] = useState('NORMAL');
  const [isAlertActive, setIsAlertActive] = useState(false);

  // Stats for the session report
  const [stats, setStats] = useState({
    stressEvents: 0,
    preStutterEvents: 0,
    duration: 0
  });

  useEffect(() => {
    let tick = 0;
    
    // Timer for duration
    const timer = setInterval(() => {
      setStats(prev => ({ ...prev, duration: prev.duration + 1 }));
    }, 1000);

    const interval = setInterval(() => {
      // User's specific simulation logic
      const getRandom = (min, max) => (Math.random() * (max - min) + min);
      
      let newBpm = parseFloat(getRandom(85, 110).toFixed(1));
      let newGsr = Math.floor(getRandom(240, 290));
      let newMic = parseFloat(getRandom(50, 2000).toFixed(1));
      let newMotion = parseFloat(getRandom(0.9, 1.2).toFixed(1));
      
      setData({
        bpm: newBpm,
        gsr: newGsr,
        speech: newMic,
        motion: newMotion
      });
      
      // Prediction logic provided by user
      let newStatus = 'NORMAL';
      if (newGsr > 275 && newMic > 800) {
        newStatus = 'PRE-STUTTER';
      } else if (newGsr > 260) {
        newStatus = 'STRESS';
      }
      
      setStatus(prev => {
        if (prev !== 'PRE-STUTTER' && newStatus === 'PRE-STUTTER') {
          setStats(s => ({ ...s, preStutterEvents: s.preStutterEvents + 1 }));
        }
        if (prev !== 'STRESS' && newStatus === 'STRESS') {
          setStats(s => ({ ...s, stressEvents: s.stressEvents + 1 }));
        }
        return newStatus;
      });

      setIsAlertActive(newStatus === 'PRE-STUTTER');
      
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
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

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m} min ${s} sec`;
  };

  return (
    <div className="screen" style={{ paddingTop: '1rem' }}>
      
      {/* Powerful Line */}
      <div style={{ 
        background: 'var(--primary-light)', 
        borderLeft: '4px solid var(--primary)', 
        padding: '1rem', 
        marginBottom: '1.5rem',
        borderRadius: '0 8px 8px 0'
      }}>
        <h3 style={{ margin: 0, color: 'var(--primary-dark)', fontSize: '1.1rem', fontWeight: '700', lineHeight: 1.4 }}>
          "This system predicts stuttering before it occurs using physiological signals."
        </h3>
      </div>

      {/* Big Prediction Status Panel */}
      <div className="card text-center mb-3" style={{ 
        backgroundColor: getStatusBg(), 
        transition: 'background-color 0.8s ease',
        border: `2px solid ${getStatusColor()}`,
        boxShadow: status === 'PRE-STUTTER' ? '0 0 20px rgba(239, 68, 68, 0.4)' : 'var(--card-shadow)',
        padding: '2rem 1rem'
      }}>
        <h4 className="text-muted mb-2" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Live Prediction</h4>
        <div style={{ 
          fontSize: '2.5rem', 
          fontWeight: '800', 
          color: getStatusColor(),
          textShadow: '0px 2px 4px rgba(0,0,0,0.1)'
        }}>
          {status === 'NORMAL' && '🟢 NORMAL'}
          {status === 'STRESS' && '🟡 STRESS'}
          {status === 'PRE-STUTTER' && '🔴 PRE-STUTTER'}
        </div>
      </div>

      {/* Alert System */}
      {isAlertActive && (
        <div className="card mb-3 alert-box" style={{ 
          backgroundColor: '#fef2f2', 
          color: '#991b1b', 
          border: '2px solid #ef4444', 
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <AlertTriangle size={36} color="#ef4444" className="blink" />
          <div>
            <strong style={{ display: 'block', fontSize: '1.1rem' }}>⚠️ ALERT: Possible speech block detected</strong>
            <span style={{ opacity: 0.9 }}>Please slow down and breathe.</span>
          </div>
        </div>
      )}

      {/* Live Sensor Dashboard */}
      <h3 className="mb-2 flex items-center gap-2">
        <Activity size={20} color="var(--primary)" />
        Live Sensor Data
      </h3>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="card text-center sensor-card">
          <Heart size={36} color="#ef4444" style={{ margin: '0 auto 0.5rem' }} className="pulse-icon" />
          <div className="text-muted mb-1 font-semibold">❤️ BPM (Heart Rate)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '700' }}>{data.bpm}</div>
        </div>
        
        <div className="card text-center sensor-card">
          <Droplet size={36} color="#3b82f6" style={{ margin: '0 auto 0.5rem' }} />
          <div className="text-muted mb-1 font-semibold">💧 GSR (Stress)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '700' }}>{data.gsr}</div>
        </div>
        
        <div className="card text-center sensor-card">
          <MicIcon size={36} color="#8b5cf6" style={{ margin: '0 auto 0.5rem' }} />
          <div className="text-muted mb-1 font-semibold">🎤 MIC (Activity)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '700' }}>{data.speech}</div>
        </div>
        
        <div className="card text-center sensor-card">
          <Activity size={36} color="#f59e0b" style={{ margin: '0 auto 0.5rem' }} />
          <div className="text-muted mb-1 font-semibold">🤚 MOTION</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '700' }}>{data.motion}</div>
        </div>
      </div>

      {/* Session Report Section */}
      <h3 className="mb-2 flex items-center gap-2">
        📊 Session Summary
      </h3>
      <div className="card mb-3" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 text-muted">
            <Clock size={18} />
            <span>Duration</span>
          </div>
          <span style={{ fontWeight: '600' }}>{formatTime(stats.duration)}</span>
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 text-muted">
            <AlertTriangle size={18} color="var(--stress)" />
            <span>Stress Events</span>
          </div>
          <span style={{ fontWeight: '600' }}>{stats.stressEvents}</span>
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 text-muted">
            <AlertTriangle size={18} color="var(--pre-stutter)" />
            <span>Pre-Stutter Events</span>
          </div>
          <span style={{ fontWeight: '600', color: stats.preStutterEvents > 0 ? 'var(--pre-stutter)' : 'inherit' }}>
            {stats.preStutterEvents}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-muted">
            <Heart size={18} color="var(--primary)" />
            <span>Avg BPM</span>
          </div>
          <span style={{ fontWeight: '600' }}>92 BPM</span>
        </div>
      </div>

      <style>{`
        .blink {
          animation: blinker 1s linear infinite;
        }
        @keyframes blinker {
          50% { opacity: 0; }
        }
        .pulse-icon {
          animation: pulseIcon 1s infinite alternate;
        }
        @keyframes pulseIcon {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .sensor-card {
          transition: transform 0.2s;
        }
        .sensor-card:active {
          transform: scale(0.98);
        }
        .alert-box {
          animation: slideDown 0.3s ease-out;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
