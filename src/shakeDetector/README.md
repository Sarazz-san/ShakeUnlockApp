# Module ShakeDetector

Détecte les **secousses du téléphone** et déclenche un déverrouillage quand le seuil est atteint.

## 🎯 Responsabilités

- ✅ Détecter les secousses via l'accéléromètre
- ✅ Compter les secousses dans une fenêtre de temps (2 secondes)
- ✅ Appliquer un seuil **dynamique selon le jour de la semaine**
- ✅ Appeler `unlock()` du `lockManager` quand le seuil est atteint
- ✅ Journaliser les activités

## 📱 Seuils par jour

| Jour | Seuil | Raison |
|------|-------|--------|
| Dimanche | 3 | Week-end |
| Lundi | 5 | Début de semaine |
| Mardi | 5 | Semaine |
| Mercredi | 4 | Milieu de semaine |
| Jeudi | 5 | Vers le week-end |
| Vendredi | 3 | Anticipation week-end |
| Samedi | 3 | Week-end |

## 🚀 Utilisation

```javascript
import shakeDetector from 'src/shakeDetector';
import { useLock } from 'src/lockManager'; // Du module du lockManager

// Dans votre composant
const { unlock } = useLock();

// Démarrer l'écoute
shakeDetector.startListening(() => {
  unlock(); // Appelé quand le seuil est atteint
});

// Arrêter l'écoute
shakeDetector.stopListening();
```

## 📂 Structure

```
src/shakeDetector/
├── index.js              # Point d'entrée (exporte le contrat)
├── detector.js           # Logique de détection
├── thresholdManager.js   # Gestion des seuils dynamiques
├── __tests__/
│   └── thresholdManager.test.js
└── README.md            # Cette documentation
```

## 🔌 Contrat du module

```javascript
export const shakeDetectorContract = {
    startListening: (callback) => {},
    stopListening: () => {},
};
```

- **`startListening(callback)`** : Commence à écouter les secousses
  - `callback` : Fonction appelée quand le seuil est atteint
  
- **`stopListening()`** : Arrête l'écoute

## ⚙️ Dépendances

- `react-native-shake` : Détection native des secousses

## 🧪 Tests

```bash
npm test -- src/shakeDetector/__tests__/
```

## 📝 Notes

- Le compteur se réinitialise après **2 secondes** d'inactivité
- Chaque jour a son propre seuil (recalculé automatiquement à minuit)
- Les logs sont préfixés avec `[ShakeDetector]` pour tracer les activités
