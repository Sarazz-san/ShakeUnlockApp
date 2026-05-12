/**
 * CONTRAT entre modules - NE PAS MODIFIER sans validation du groupe
 */

export const lockManagerContract = {
    useLock: () => ({ isLocked: true, lock: () => {}, unlock: () => {} }),
};

export const shakeDetectorContract = {
    startListening: () => {},
    stopListening: () => {},
};

export const fingerprintScannerContract = {
    scan: () => Promise.resolve({ success: true }),
    isAvailable: () => Promise.resolve(true),
};

export const uiContract = {
    LockedScreen: () => null,
    UnlockedScreen: () => null,
    LockButton: () => null,
};

// integration n'a pas de contrat, c'est toi
