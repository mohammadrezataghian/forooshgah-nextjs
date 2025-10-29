// src/hooks/useNormalizeDigits.ts
export const useNormalizeDigits = () => {
    const normalizeDigits = (input: string): string => {
      const persianDigits = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
      const arabicDigits = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
  
      let normalized = input;
      for (let i = 0; i < 10; i++) {
        normalized = normalized.replace(persianDigits[i], i.toString());
        normalized = normalized.replace(arabicDigits[i], i.toString());
      }
      return normalized;
    };
  
    return { normalizeDigits };
  };
  