
export const getModels = () => {
  // return fetch(
  //   "/model",
  //   { method: "GET" }
  // );
  return new Promise((res, rej) => {
    res([
      {"name": "tmp", "key": "tmpkey"}
    ])
  });
};

export const pushModel = (data) => {
  return fetch(
    "/model", 
    {
      method: "POST",
      body: JSON.stringify(data)
    }
  );
}

export const trainModel = (key, data) => {
  return fetch(
    `/train/${key}`,
    {
      method: "POST",
      body: JSON.stringify(data)
    }
  );
}

export const evalModel = (key, data) => {
  return fetch(
    "/eval",
    {
      method: "POST",
      body: JSON.stringify({
        key,
        data
      })
    }
  );
}