const getCosmicIcon = () => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><line x1="2" y1="12" x2="22" y2="12"></line></svg>';
const getTarotIcon = () => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="2" width="18" height="20" rx="2" ry="2"></rect><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>';
const getNumIcon = () => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>';

const getInitialData = () => {
  const cDate = new Date();
  
  return [
    { id: Date.now()+1, date: new Date(cDate.setMonth(cDate.getMonth() - 1)).toISOString(), title: 'Predicción Semestral', desc: 'Análisis de Futuro Corto Plazo', category: 'Predicción', iconClass: 'purple-bg', icon: getNumIcon(), metaLabel: 'CICLO', metaValue: 'Activo', metaGold: true },
    { id: Date.now()+2, date: new Date(cDate.setDate(cDate.getDate() - 5)).toISOString(), title: 'Lectura del Karma', desc: 'Interpretación Numerológica', category: 'Numerología', iconClass: 'purple-bg', icon: getNumIcon(), metaLabel: 'NÚMERO GUÍA', metaValue: 'VII', metaGold: false },
    { id: Date.now()+3, date: new Date(cDate.setMonth(cDate.getMonth() - 1)).toISOString(), title: 'Cruz Celta', desc: 'Tirada de Tarot: Completa', category: 'Tarot', iconClass: 'gold-bg-icon', icon: getTarotIcon(), metaLabel: 'INFLUENCIA', metaValue: 'Fuego', metaGold: true },
    { id: Date.now()+4, date: new Date().toISOString(), title: 'Compatibilidad de Almas', desc: 'Sinastría Astral', category: 'Carta Natal', iconClass: 'cosmic-bg', icon: getCosmicIcon(), metaLabel: 'AFINIDAD', metaValue: 'Alta', metaGold: true }
  ];
};

export const getLibrary = () => {
  const data = localStorage.getItem('aetheric_library');
  if (!data) {
    const defaultData = getInitialData();
    localStorage.setItem('aetheric_library', JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(data);
};

export const saveToLibrary = (reading) => {
  const library = getLibrary();
  library.unshift(reading); // Add to beginning (newest first)
  localStorage.setItem('aetheric_library', JSON.stringify(library));
};

export const clearLibrary = () => {
  localStorage.removeItem('aetheric_library');
};

export const formatLibraryByMonth = (libraryItems) => {
  const grouped = {};
  
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  
  libraryItems.forEach(item => {
    const d = new Date(item.date);
    const monthYear = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    
    if (!grouped[monthYear]) {
      grouped[monthYear] = { month: monthYear, items: [] };
    }
    grouped[monthYear].items.push(item);
  });
  
  return Object.values(grouped);
};
