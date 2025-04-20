'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const [isCaptured, setIsCaptured] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      startCamera();
    }
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const capture = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0);
      const imageSrc = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageSrc);
      setIsCaptured(true);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const retake = () => {
    setCapturedImage(null);
    setIsCaptured(false);
    startCamera();
  };

  const saveAndClose = () => {
    // Here you would typically save the image or send it to your backend
    console.log('Saving image:', capturedImage);
    stopCamera();
    router.back();
  };

  return (
    <div className="relative h-full w-full bg-black">
      {/* Close Button */}
      <button className="absolute top-5 right-3 z-10 p-1 rounded-full bg-gray-900/30"
        onClick={() => {
          stopCamera();
          router.back();
        }}
      >
        <XMarkIcon className="w-6 h-6" />
      </button>

      {/* Camera Preview */}
      <div className="relative h-full w-full">
        {!isCaptured ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="h-full w-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />
          </>
        ) : (
          <div className="h-full">
            <img 
              src={capturedImage || ''} 
              alt="Captured" 
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Camera Controls */}
        <div className="absolute bottom-12 inset-x-0 pb-10 flex items-center justify-center space-x-6">
          {!isCaptured ? (
            <button
              onClick={capture}
              className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center"
            >
              <div className="w-13 h-13 rounded-full bg-white" />
            </button>
          ) : (
            <>
              <button
                onClick={retake}
                className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              <button
                onClick={saveAndClose}
                className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white"
              >
                <CheckIcon className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 