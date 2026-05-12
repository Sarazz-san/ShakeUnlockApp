/**
 * Exemple d'intégration du module shakeDetector avec lockManager
 * À placer dans App.tsx ou un composant racine
 */

import { useEffect, useRef } from 'react';
import { useLock } from '../lockManager';
import shakeDetector from './index';

/**
 * Hook personnalisé pour intégrer le détecteur de secousse
 * Démarre l'écoute au montage et l'arrête au démontage
 */
export const useShakeDetector = () => {
  const { unlock } = useLock();
  const listenerRef = useRef(null);

  useEffect(() => {
    try {
      // Démarrer l'écoute des secousses
      shakeDetector.startListening(() => {
        console.log('[Integration] Seuil de secousses atteint - Déverrouillage!');
        unlock();
      });

      console.log('[Integration] Détecteur de secousse activé');

      // Cleanup: arrêter l'écoute au démontage
      return () => {
        shakeDetector.stopListening();
        console.log('[Integration] Détecteur de secousse désactivé');
      };
    } catch (error) {
      console.error('[Integration] Erreur lors de l\'activation du détecteur:', error);
    }
  }, [unlock]);
};

/**
 * Exemple d'utilisation dans un composant
 * 
 * import { useShakeDetector } from 'src/shakeDetector/integration';
 * 
 * function App() {
 *   useShakeDetector(); // Active automatiquement le détecteur
 *   
 *   return (
 *     <LockedScreen />
 *   );
 * }
 */
