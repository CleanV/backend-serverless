export default function getQueryParams(url: string): any {
    const params = {};
    const queryString = url.split('?')[1];

    if (queryString) {
        const paramPairs = queryString.split('&');
    
        for (let i = 0; i < paramPairs.length; i++) {
          const pair = paramPairs[i].split('=');
          const key = decodeURIComponent(pair[0]);
          const value = pair.length > 1 ? decodeURIComponent(pair[1]) : null;
          params[key] = value;
        }
    }

    return params;
}