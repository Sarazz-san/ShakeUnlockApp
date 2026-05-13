/**
 * Mock de react-native-shake pour tester sans la vraie librairie
 * À utiliser si react-native-shake ne peut pas être installé
 */

let listeners = [];
let isShaking = false;

const mockRNShake = {
  addListener: (callback) => {
    const listener = {
      callback,
      remove: () => {
        listeners = listeners.filter(l => l !== listener);
      },
    };
    listeners.push(listener);
    return listener;
  },
  removeListener: () => {
    listeners = [];
  },
  // Méthode de test pour simuler une secousse
  _simulateShake: () => {
    listeners.forEach(listener => {
      if (listener.callback) {
        listener.callback();
      }
    });
  },
  _reset: () => {
    listeners = [];
    isShaking = false;
  },
};

export default mockRNShake;
