import axios from 'axios';

const host = "http://api.kvoli.com";

export const getModels = () => {
  // return new Promise((res, rej) => {
  //   res({ data: {
  //     "0": {name: "Cool Model", id: "0", input_features: [{"name": "doc_text", "type": "string"}], "output_features": [{"name": "class", "type": "category"}]},
  //     "1": {name: "Cooler Model", id: "1", input_features: [{"name": "doc_text", "type": "string"}, {"name": "doc_image", "type": "image"}], "output_features": [{"name": "class", "type": "category"}]},
  //     "2": {name: "Coolest Model", id: "2", input_features: [{"name": "doc_text", "type": "string"}], "output_features": [{"name": "class", "type": "category"}]}
  //   }});
  // });
  return axios({
    url: `${host}/model`,
    method: "GET"
  });
};

export const pushModel = (name, modelFile) => {
  const form = new FormData();
  form.append("name", name);
  form.append("model", modelFile);
  
  return axios({
    url: `${host}/model`, 
    method: "POST",
    body: form
  });
}

export const trainModel = (name, ioFile, dataFile) => {
  const form = new FormData();
  form.append("name", name);
  form.append("io_params", ioFile);
  form.append("training_data", dataFile);
  
  return axios({
    url: `${host}/train`,
    method: "POST",
    body: form
  });
}

export const evalModel = (id, data) => {
  return new Promise((res, rej) => {
    res({ msg: {
      "class_predictions": {
        "0": "sport"
      }}});
  });
  return axios({
    url: `${host}/eval`,
    method: "POST",
    body: JSON.stringify({
      id,
      data
    })
  });
}
