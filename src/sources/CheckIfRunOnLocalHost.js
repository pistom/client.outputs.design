class CheckIfRunOnLocalHost {

  static check() {
    const currentUrl = window.location.host.split(':')[0];
    const localDomains = [
      'localhost',
      '127.0.0.1',
      'client.outputs.local'
    ];
    console.log(currentUrl);
    return localDomains.indexOf(currentUrl) !== -1;
  }
}

export default CheckIfRunOnLocalHost;
