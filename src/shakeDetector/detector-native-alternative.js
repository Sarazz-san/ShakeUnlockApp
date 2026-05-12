/**
 * Implémentation alternative sans dépendance externe
 * Peut être utilisée si react-native-shake n'est pas disponible
 * Nécessite une implémentation native personnalisée
 */

import { NativeEventEmitter, NativeModules } from 'react-native';

const { ShakeModule } = NativeModules;

export const createShakeDetector = () => {
  let isListening = false;
  let subscription = null;

  const startListening = (callback) => {
    if (isListening) {
      console.warn('[ShakeDetector-Alternative] Déjà en écoute');
      return;
    }

    if (!ShakeModule) {
      console.error('[ShakeDetector-Alternative] Module natif ShakeModule non disponible');
      return;
    }

    isListening = true;
    const eventEmitter = new NativeEventEmitter(ShakeModule);
    
    subscription = eventEmitter.addListener('ShakeDetected', () => {
      if (callback) {
        callback();
      }
    });

    ShakeModule.startListening();
    console.log('[ShakeDetector-Alternative] Écoute activée (implémentation native)');
  };

  const stopListening = () => {
    if (!isListening) {
      console.warn('[ShakeDetector-Alternative] Pas en écoute');
      return;
    }

    if (subscription) {
      subscription.remove();
      subscription = null;
    }

    if (ShakeModule) {
      ShakeModule.stopListening();
    }

    isListening = false;
    console.log('[ShakeDetector-Alternative] Écoute désactivée (implémentation native)');
  };

  return {
    startListening,
    stopListening,
  };
};
