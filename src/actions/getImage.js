import fetch from 'isomorphic-fetch';

const myHeaders = new Headers();
const myInit = {
  method: 'GET',
  headers: myHeaders,
  cache: 'force-cache'
};

function getImage(frameId, imgFullPath) {
  return {
    type: 'GET_IMAGE',
    payload: {
      promise: fetch(imgFullPath, myInit)
        .then(response => {
          // console.log(response);
          return response.blob();
        })
        .then(function(myBlob) {
          const objectURL = URL.createObjectURL(myBlob);
          // console.log(myBlob);
          const image = {};
          image[frameId] = {objectURL};
          return image;
        })
    }
  };
}

module.exports = getImage;
