import { initializeEsignWidget } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  // Wait for the external widget script to load
  const script = document.createElement('script');

  script.src = 'https://signdesk.in/api/eSignWidgetUat.js';
  script.onload = () => initializeEsignWidget();
  script.onerror = () => console.error('Failed to load the widget script.');
  document.body.appendChild(script);
});
