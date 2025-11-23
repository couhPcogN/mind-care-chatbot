import React, { useState, useEffect, useRef } from 'react';
import { Appointment } from '../types';
import { MicrophoneIcon, VideoCameraIcon, PhoneXMarkIcon, VideoCameraSlashIcon } from '../components/icons';

interface ExpertVideoCallViewProps {
  appointment: Appointment;
  onEndSession: () => void;
}

// Using a more pensive/moody portrait for the user to match the "mental health concern" context
const USER_AVATAR_PLACEHOLDER = 'https://images.unsplash.com/photo-1519743174863-363dbd598507?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';


const ExpertVideoCallView: React.FC<ExpertVideoCallViewProps> = ({ appointment, onEndSession }) => {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [callStatus, setCallStatus] = useState('connecting'); // connecting, connected, ended

  useEffect(() => {
    const timer = setTimeout(() => {
        setCallStatus('connected');
    }, 2000); // Simulate connection time

    return () => clearTimeout(timer);
  }, []);

  const handleEndCall = () => {
    setCallStatus('ended');
    setTimeout(onEndSession, 1000); // Go back after a short delay
  };
  
  const getStatusText = () => {
      switch (callStatus) {
          case 'connecting': return 'Đang kết nối...';
          case 'connected': return 'Đã kết nối';
          case 'ended': return 'Cuộc gọi đã kết thúc';
          default: return '';
      }
  }

  return (
    <div className="relative flex flex-col h-full bg-black text-white">
      {/* Expert View -> Now an Image */}
      <div className="relative flex-1 flex items-center justify-center bg-gray-900">
        <img 
            src={appointment.expertAvatar} 
            alt={appointment.expertName}
            className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 bg-black/50 p-2 rounded-lg">
            <p className="font-semibold">{appointment.expertName}</p>
        </div>
         <div className={`absolute top-4 left-4 text-sm px-3 py-1 rounded-full flex items-center gap-2 ${callStatus === 'connected' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}>
            <span className={`w-2 h-2 rounded-full ${callStatus === 'connected' ? 'bg-green-300' : 'bg-yellow-300'}`}></span>
            {getStatusText()}
        </div>
      </div>

      {/* User View (Picture-in-Picture) -> Now an Image or Placeholder */}
      <div className="absolute top-4 right-4 w-1/4 max-w-xs h-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden border-2 border-gray-600 aspect-square">
         {isCamOff ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-500">
                <VideoCameraSlashIcon />
            </div>
        ) : (
            <img 
                src={USER_AVATAR_PLACEHOLDER} 
                alt="Bạn"
                className="w-full h-full object-cover"
            />
        )}
        <div className="absolute bottom-2 left-2 bg-black/50 p-1 rounded-md text-xs">
            <p>Bạn</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex-shrink-0 bg-gray-900/80 p-4 flex items-center justify-center space-x-4">
        <button
          onClick={() => setIsMicMuted(!isMicMuted)}
          className={`p-3 rounded-full transition-colors duration-200 ${isMicMuted ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'}`}
          aria-label={isMicMuted ? 'Unmute microphone' : 'Mute microphone'}
        >
          <MicrophoneIcon />
        </button>
        <button
          onClick={() => setIsCamOff(!isCamOff)}
          className={`p-3 rounded-full transition-colors duration-200 ${isCamOff ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'}`}
          aria-label={isCamOff ? 'Turn camera on' : 'Turn camera off'}
        >
          <VideoCameraIcon />
        </button>
        <button
          onClick={handleEndCall}
          className="p-4 bg-red-600 hover:bg-red-700 rounded-full transition-colors duration-200"
          aria-label="End call"
        >
          <PhoneXMarkIcon />
        </button>
      </div>
    </div>
  );
};

export default ExpertVideoCallView;