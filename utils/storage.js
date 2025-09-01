export const storage = {
  get(key, defaultValue = null) {
    if (typeof window === "undefined") return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
      console.error("Failed to parse localStorage item:", err);
      return defaultValue;
    }
  },

  set(key, value) {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Failed to set localStorage item:", err);
    }
  },

  remove(key) {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error("Failed to remove localStorage item:", err);
    }
  },
};
