/**
 * Module ShakeDetector
 * Détecte les secousses du téléphone et appelle unlock() du lockManager
 * quand le seuil dynamique est atteint
 */

import { startListening as _startListening, stopListening as _stopListening } from './detector';
import { getThresholdForToday } from './thresholdManager';

let currentListener = null;

/**
 * Démarre l'écoute des secousses
 * Appelle le callback passé quand le seuil est atteint
 * 
 * @param {Function} onThresholdReached - Callback appelé au déverrouillage
 */
export const startListening = (onThresholdReached) => {
  if (typeof onThresholdReached !== 'function') {
    throw new Error('onThresholdReached doit être une fonction');
  }

  currentListener = _startListening(onThresholdReached);
  const threshold = getThresholdForToday();
  console.log(`[ShakeDetector] Module démarré - Seuil: ${threshold} secousses`);
};

/**
 * Arrête l'écoute des secousses
 */
export const stopListening = () => {
  _stopListening(currentListener);
  currentListener = null;
  console.log('[ShakeDetector] Module arrêté');
};

/**
 * Exporte le contrat du module pour les autres modules
 */
export default {
  startListening,
  stopListening,
};
