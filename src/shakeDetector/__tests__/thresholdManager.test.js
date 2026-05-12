import { getThresholdForToday, getThresholdForDay, getAllThresholds } from '../thresholdManager';

describe('ThresholdManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getThresholdForToday', () => {
    it('should return 3 for Sunday', () => {
      const mockDate = new Date('2026-05-10'); // Dimanche
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

      const threshold = getThresholdForToday();
      expect(threshold).toBe(3);

      jest.spyOn(global, 'Date').mockRestore();
    });

    it('should return 5 for Monday', () => {
      const mockDate = new Date('2026-05-11'); // Lundi
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

      const threshold = getThresholdForToday();
      expect(threshold).toBe(5);

      jest.spyOn(global, 'Date').mockRestore();
    });

    it('should return 3 for Friday', () => {
      const mockDate = new Date('2026-05-15'); // Vendredi
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

      const threshold = getThresholdForToday();
      expect(threshold).toBe(3);

      jest.spyOn(global, 'Date').mockRestore();
    });
  });

  describe('getThresholdForDay', () => {
    it('should return correct threshold for each day', () => {
      expect(getThresholdForDay(0)).toBe(3); // Dimanche
      expect(getThresholdForDay(1)).toBe(5); // Lundi
      expect(getThresholdForDay(2)).toBe(5); // Mardi
      expect(getThresholdForDay(3)).toBe(4); // Mercredi
      expect(getThresholdForDay(4)).toBe(5); // Jeudi
      expect(getThresholdForDay(5)).toBe(3); // Vendredi
      expect(getThresholdForDay(6)).toBe(3); // Samedi
    });

    it('should throw error for invalid day', () => {
      expect(() => getThresholdForDay(-1)).toThrow();
      expect(() => getThresholdForDay(7)).toThrow();
    });
  });

  describe('getAllThresholds', () => {
    it('should return all thresholds', () => {
      const thresholds = getAllThresholds();
      expect(thresholds).toEqual({
        0: 3,
        1: 5,
        2: 5,
        3: 4,
        4: 5,
        5: 3,
        6: 3,
      });
    });
  });
});
