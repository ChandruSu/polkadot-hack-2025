'use client';

import React, { useState } from 'react';
import { CameraIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Map, { Challenge } from './components/Map';

export default function Home() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      coordinates: [-0.481747846041145, 51.3233379650232],
      title: 'Royal Statue',
      description: 'Take a photo with the famous statue in the Royal Gardens',
      type: 'photo',
      points: 100,
      distance: 0.5,
    },
    {
      id: '2',
      coordinates: [-0.482747846041145, 51.3243379650232],
      title: 'Historic Fountain',
      description: 'Find the hidden message near the fountain',
      type: 'location',
      points: 150,
      distance: 1.2,
    },
    {
      id: '1',
      coordinates: [-0.481747846041145, 51.3233379650232],
      title: 'Royal Statue',
      description: 'Take a photo with the famous statue in the Royal Gardens',
      type: 'photo',
      points: 100,
      distance: 0.5,
    },
    {
      id: '2',
      coordinates: [-0.482747846041145, 51.3243379650232],
      title: 'Historic Fountain',
      description: 'Find the hidden message near the fountain',
      type: 'location',
      points: 150,
      distance: 1.2,
    },
  ]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [showNearby, setShowNearby] = useState(false);

  const handleStartChallenge = () => {
    if (activeChallenge) {
      // If there's already an active challenge, don't start a new one
      return;
    }

    if (selectedChallenge?.type === 'photo') {
      setSelectedChallenge(null);
    } else if (selectedChallenge?.type === 'location') {
      // Set active challenge to show directions
      setActiveChallenge(selectedChallenge);
      setSelectedChallenge(null);
      setShowNearby(false);
    }
  };

  return (
    <div className="relative h-full w-full bg-gray-900 p-3">
      <h1 className="text-2xl font-bold text-white my-6">Crumbs</h1>

      {/* Map Container */}
      <div className="absolute inset-2 pt-16 pb-28">
        <Map 
          challenges={challenges}
          onChallengeSelect={(challenge) => {
            // Don't allow selecting new challenges if one is active
            if (!activeChallenge) {
              setSelectedChallenge(challenge);
            }
          }}
          activeChallenge={activeChallenge}
        />
      </div>

      {/* Active Challenge Banner */}
      {activeChallenge && (
        <div className="absolute top-21 left-5 right-5 bg-green-600/70 backdrop-blur-sm p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Following directions to:</h3>
              <p className="text-white/90">{activeChallenge.title}</p>
            </div>
            <button
              onClick={() => {
                setActiveChallenge(null);
                setShowNearby(true);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Nearby Challenges List */}
      <div className={`absolute bottom-20 left-2 right-2 h-[33vh] bg-gray-800/90 backdrop-blur-sm rounded-t-2xl transition-transform duration-300 transform ${showNearby ? 'translate-y-0' : 'translate-y-[calc(100%-2rem)]'}`}>
        {/* Drag Handle */}
        <div className="sticky top-0 left-0 right-0 bg-gray-800/90 backdrop-blur-sm pt-3 pb-2 rounded-t-2xl z-10">
          <div 
            className="h-1.5 w-12 bg-gray-600 rounded-full mx-auto cursor-pointer"
            onClick={() => setShowNearby(!showNearby)}
          />
          <h3 className="text-white font-semibold px-4 mt-2">Nearby Challenges</h3>
        </div>

        {/* Scrollable Challenge List */}
        <div className="px-4 overflow-y-auto h-[calc(100%-3rem)]">
          <div className="space-y-3 py-2">
            {challenges.map((challenge, index) => (
              <div 
                key={index}
                className={`bg-gray-700/50 p-3 rounded-lg transition-colors ${
                  activeChallenge 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'cursor-pointer hover:bg-gray-700/70'
                }`}
                onClick={() => {
                  // Don't allow selecting new challenges if one is active
                  if (!activeChallenge) {
                    setSelectedChallenge(challenge);
                  }
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-medium">{challenge.title}</h4>
                    <p className="text-gray-400 text-sm">{challenge.distance}km away</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-500 font-semibold">{challenge.points}pts</span>
                    {challenge.type === 'photo' ? (
                      <CameraIcon className="w-5 h-5 text-purple-500" />
                    ) : (
                      <MapPinIcon className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Challenge Popup */}
      {selectedChallenge && (
        <div className="absolute top-20 left-4 right-4 bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-white font-bold text-lg">{selectedChallenge.title}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500 font-semibold">{selectedChallenge.points}pts</span>
              {selectedChallenge.type === 'photo' ? (
                <CameraIcon className="w-5 h-5 text-purple-500" />
              ) : (
                <MapPinIcon className="w-5 h-5 text-green-500" />
              )}
            </div>
          </div>
          <p className="text-gray-300 text-sm mb-4">{selectedChallenge.description}</p>
          <div className="flex space-x-3">
            <button
              onClick={() => setSelectedChallenge(null)}
              className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
            {selectedChallenge.type === 'photo' ? (
              <Link
                href="/camera"
                className={`flex-1 text-white py-2 px-4 rounded-lg text-center ${
                  activeChallenge
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700'
                } transition-colors`}
                onClick={(e) => {
                  if (activeChallenge) {
                    e.preventDefault();
                  }
                }}
              >
                Start Challenge
              </Link>
            ) : (
              <button
                onClick={handleStartChallenge}
                className={`flex-1 text-white py-2 px-4 rounded-lg ${
                  activeChallenge
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700'
                } transition-colors`}
                disabled={!!activeChallenge}
              >
                Start Challenge
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}