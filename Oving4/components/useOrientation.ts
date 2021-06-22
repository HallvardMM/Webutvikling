/*Listener made to check if phone is in portrait mode or landscape mode */
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

/**
 * Returns true if the screen is in portrait mode
 */
const isPortrait = () => {
  const dim = Dimensions.get('window');
  return dim.height >= dim.width;
};

/**
 * A React Hook which updates when the orientation changes
 * @returns whether the device is in Portrait return 'true' else 'false'
 */
export function useOrientation(): boolean {
  // State to hold the connection status
  const [Portrait, setPortrait] = useState<boolean>(
    isPortrait(),
  );

  useEffect(() => {
    const callback = () => setPortrait(isPortrait());

    Dimensions.addEventListener('change', callback);

    return () => {
      Dimensions.removeEventListener('change', callback);
    };
  }, []);

  return Portrait;
}