const normalizeUrl = (value) => (value ? value.replace(/\/$/, '') : value);

export const getSiteBaseUrl = (location = typeof window !== 'undefined' ? window.location : { protocol: 'http:', hostname: 'localhost' }, override = process.env.REACT_APP_SITE_URL) => {
  if (override) {
    return normalizeUrl(override);
  }

  const protocol = location.protocol || 'http:';
  const hostname = location.hostname || 'localhost';
  return `${protocol}//${hostname}`;
};

export const getApiBaseUrl = (location = typeof window !== 'undefined' ? window.location : { protocol: 'http:', hostname: 'localhost' }, override = process.env.REACT_APP_API_URL) => {
  if (override) {
    return normalizeUrl(override);
  }

  return `${getSiteBaseUrl(location)}/mobileria-api/api`;
};

export const getUploadsBaseUrl = (location = typeof window !== 'undefined' ? window.location : { protocol: 'http:', hostname: 'localhost' }, override = process.env.REACT_APP_UPLOADS_URL) => {
  if (override) {
    return normalizeUrl(override);
  }

  return `${getSiteBaseUrl(location)}/mobileria-api/uploads`;
};

export const SITE_BASE_URL = getSiteBaseUrl();
export const API_URL = getApiBaseUrl();
export const UPLOADS_BASE_URL = getUploadsBaseUrl();
