import axios from 'axios';


export const getModels = () => {
  return new Promise((res, rej) => {
    res({ data: [
      {name: "Cool Model", key: "0"},
      {name: "Cooler Model", key: "1"},
      {name: "Coolest Model", key: "2"}] 
    });
  });
  // return axios({
  //   url: "TODO/model",
  //   method: "GET"
  // });
};

export const pushModel = (name, filename) => {
  return fetch({
    url: "TODO/model", 
    method: "POST",
    body: JSON.stringify({
      name,
      data: filename
    })
  });
}

export const trainModel = (key, data) => {
  return axios({
    url: `TODO/train/${key}`,
    method: "POST",
    body: JSON.stringify(data)
  });
}

export const evalModel = (key, data) => {
  return axios({
    url: "TODO/eval",
    method: "POST",
    body: JSON.stringify({
      key,
      data
    })
  });
}