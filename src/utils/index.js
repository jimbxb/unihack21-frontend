import axios from 'axios';


export const getModels = () => {
  return new Promise((res, rej) => {
    res({ data: [
      {name: "Daniel", key: "0", input_features: [{"name": "doc_text", "type": "text"}, {"name": "doc_image", "type": "image"}], "output_features": [{"name": "class", "type": "category"}]},
      {name: "The Cooler Daniel", key: "1", input_features: [{"name": "doc_text", "type": "text"}], "output_features": [{"name": "class", "type": "category"}]},
      {name: "Coolest Model", key: "2", input_features: [{"name": "doc_text", "type": "text"}], "output_features": [{"name": "class", "type": "category"}]}] 
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