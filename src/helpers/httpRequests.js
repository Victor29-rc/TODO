const sendHttpRequest = async (url, setData, init) => {
  try {
    const response = await fetch(url, init);

    if (!response.ok) {
      return {
        error: true,
      };
    }

    const data = await response.json();

    if (init.method.toUpperCase() === 'GET') {
      setData(data.todos);
    }
  } catch (error) {
    return {
      error: true,
    };
  }

  return { error: false };
};

export default sendHttpRequest;
