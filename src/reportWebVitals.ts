import { onCLS, onFID, onLCP, onTTFB, onFCP } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
    onFCP(onPerfEntry);
  }
};

export default reportWebVitals;
