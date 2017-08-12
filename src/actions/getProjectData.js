import fetch from 'isomorphic-fetch';

function getProjectData(projectId) {
  const dataSource = `http://api.outputs.cinquiemecrayon.eu/getData.php?projectId=${projectId}`;
  return {
    type: 'GET_PROJECT_DATA',
    payload: {
      promise: fetch(dataSource)
        .then(response => response.json())
    }
  };
}

module.exports = getProjectData;
