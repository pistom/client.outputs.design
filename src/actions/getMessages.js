import fetch from 'isomorphic-fetch';

function getMessages(projectId, password) {
  const dataSource = `${apiURL}getMessages.php?projectId=${projectId}`;
  const data = new FormData();
  data.append('password', password);
  return {
    type: 'GET_MESSAGES',
    payload: {
      promise: fetch(dataSource, {
        method: 'POST',
        body: data
      })
        .then(response => response.json())
    }
  };
}

module.exports = getMessages;
