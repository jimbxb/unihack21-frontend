import axios from 'axios';

const host = "https://165.232.169.221:5000"

export const getModels = () => {
  return new Promise((res, rej) => {
    res({ data: [
      {name: "Cool Model", key: "0", input_features: [{"name": "doc_text", "type": "text"}], "output_features": [{"name": "class", "type": "category"}]},
      {name: "Cooler Model", key: "1", input_features: [{"name": "doc_text", "type": "text"}, {"name": "doc_image", "type": "image"}], "output_features": [{"name": "class", "type": "category"}]},
      {name: "Coolest Model", key: "2", input_features: [{"name": "doc_text", "type": "text"}], "output_features": [{"name": "class", "type": "category"}]}] 
    });
  });
  // return axios({
  //   url: `${host}/model`,
  //   method: "GET"
  // });
};

export const pushModel = (name, file) => {
  const form = new FormData();
  form.append("name", name);
  form.append("file", file);
  
  return axios({
    url: `${host}/model`, 
    method: "POST",
    body: form
  });
}

export const trainModel = (key, data) => {
  return axios({
    url: `${host}/train/${key}`,
    method: "POST",
    body: JSON.stringify(data)
  });
}

export const evalModel = (key, data) => {
  return new Promise((res, rej) => {
    res({ msg: {
      "class_predictions": {
        "0": "sport"
      }}});
  });
  // return axios({
  //   url: `${host}/eval`,
  //   method: "POST",
  //   body: JSON.stringify({
  //     key,
  //     data
  //   })
  // });
}