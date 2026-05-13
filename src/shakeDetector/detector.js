import RNShake from 'react-native-shake';
import { getThresholdForToday } from './thresholdManager';

/**
 * Gestionnaire d'état du détecteur de secousse
 */
let shakeCount = 0;
let resetTimeout = null;
let onThresholdReachedCallback = null;
let isListening = false;

// Réinitialiser le compteur après 2 secondes d'inactivité
const RESET_DELAY = 2000;

/**
 * Réinitialise le compteur de secousses
 */
const resetShakeCount = () => {
  shakeCount = 0;
  if (resetTimeout) {
    clearTimeout(resetTimeout);
    resetTimeout = null;
  }
};

/**
 * Démarre l'écoute des secousses
 * @param {Function} onThresholdReached - Callback appelé quand le seuil est atteint
 */
export const startListening = (onThresholdReached) => {
  if (isListening) {
    console.warn('[ShakeDetector] Déjà en écoute');
    return;
  }

  onThresholdReachedCallback = onThresholdReached;
  isListening = true;
  resetShakeCount();

  const currentThreshold = getThresholdForToday();
  console.log(`[ShakeDetector] Écoute activée. Seuil pour aujourd'hui: ${currentThreshold} secousses`);

  // Enregistrer le listener
  const listener = RNShake.addListener(() => {
    shakeCount++;
    const threshold = getThresholdForToday();

    console.log(`[ShakeDetector] Secousse détectée (${shakeCount}/${threshold})`);

    // Réinitialiser le timer
    if (resetTimeout) {
      clearTimeout(resetTimeout);
    }
    resetTimeout = setTimeout(() => {
      console.log('[ShakeDetector] Compteur réinitialisé');
      resetShakeCount();
    }, RESET_DELAY);

    // Vérifier si le seuil est atteint
    if (shakeCount >= threshold) {
      console.log(`[ShakeDetector] Seuil atteint! Déverrouillage...`);
      if (onThresholdReachedCallback) {
        onThresholdReachedCallback();
      }
      resetShakeCount();
    }
  });

  return listener;
};

/**
 * Arrête l'écoute des secousses
 * @param {Object} listener - Le listener retourné par startListening
 */
export const stopListening = (listener) => {
  if (!isListening) {
    console.warn('[ShakeDetector] Pas en écoute');
    return;
  }

  if (listener) {
    listener.remove();
  }

  isListening = false;
  resetShakeCount();
  console.log('[ShakeDetector] Écoute désactivée');
};

/**
 * Retourne l'état du détecteur
 */
export const getStatus = () => ({
  isListening,
  shakeCount,
  threshold: getThresholdForToday(),
});
