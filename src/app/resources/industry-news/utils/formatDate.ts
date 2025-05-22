export const formatDate = (dateStr: string) => {
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  } catch (error) {
    // Ignore errors with date parsing and return a fallback string
    console.error('Error parsing date:', error);
    return 'Date unavailable';
  }
};
