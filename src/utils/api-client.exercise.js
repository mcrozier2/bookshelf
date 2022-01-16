function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig
  }
  return fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
  .then(response => response.json());
}

export {client}