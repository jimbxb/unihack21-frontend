import axios from 'axios';


export const getModels = () => {
  return axios({
    url: "TODO/model",
    method: "GET"
  });
};

export const pushModel = (data) => {
  return fetch({
    url: "TODO/model", 
    method: "POST",
    body: JSON.stringify(data)
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