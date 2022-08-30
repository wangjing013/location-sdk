declare global {
  interface Window {
    _afterGetLocation: (data) => void;
  }
}

export {};
