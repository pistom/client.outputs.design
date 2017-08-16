import fetch from 'isomorphic-fetch';

function getProjectData(projectId, password) {
  const dataSource = `http://api.outputs.local/getData.php?projectId=${projectId}`;
  const data = new FormData();
  data.append('password', password);
  return {
    type: 'GET_PROJECT_DATA',
    payload: {
      promise: fetch(dataSource, {
        method: 'POST',
        body: data
      })
        .then(response => response.json())
    }
  };
}

module.exports = getProjectData;
