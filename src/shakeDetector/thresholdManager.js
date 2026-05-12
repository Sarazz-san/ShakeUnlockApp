/**
 * Gère le seuil dynamique de secousses selon le jour de la semaine
 * Dimanche = jour 0, Samedi = jour 6
 */

/**
 * Seuils par jour de la semaine
 * Dimanche (0): 3 secousses
 * Lundi (1): 5 secousses
 * Mardi (2): 5 secousses
 * Mercredi (3): 4 secousses
 * Jeudi (4): 5 secousses
 * Vendredi (5): 3 secousses (anticipation du week-end)
 * Samedi (6): 3 secousses
 */
const THRESHOLDS_BY_DAY = {
  0: 3, // Dimanche
  1: 5, // Lundi
  2: 5, // Mardi
  3: 4, // Mercredi
  4: 5, // Jeudi
  5: 3, // Vendredi
  6: 3, // Samedi
};

/**
 * Retourne le seuil de secousses requis pour aujourd'hui
 * @returns {number} Nombre de secousses requis
 */
export const getThresholdForToday = () => {
  const today = new Date().getDay();
  return THRESHOLDS_BY_DAY[today];
};

/**
 * Retourne le seuil pour un jour spécifique
 * @param {number} dayOfWeek - 0-6 (0 = Dimanche)
 * @returns {number} Nombre de secousses requis
 */
export const getThresholdForDay = (dayOfWeek) => {
  if (dayOfWeek < 0 || dayOfWeek > 6) {
    throw new Error('dayOfWeek doit être entre 0 et 6');
  }
  return THRESHOLDS_BY_DAY[dayOfWeek];
};

/**
 * Retourne tous les seuils par jour
 * @returns {Object} Dictionnaire des seuils
 */
export const getAllThresholds = () => ({
  ...THRESHOLDS_BY_DAY,
});
