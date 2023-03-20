export const makeCORSRequest = (method, url) => {
  return new Promise((resolve, reject) => {
    const xhr = createCORSRequest(method, url);

    xhr.onload = () => {
      //   if (xhr.status >= 200 && xhr.status < 300) {
      resolve(xhr.response);
      //   } else {
      //     reject({
      //       status: xhr.status,
      //       statusText: xhr.statusText,
      //     });
      //   }
    };

    xhr.onerror = () => {
      reject({
        status: xhr.status,
        statusText: xhr.status,
      });
    };

    xhr.withCredentials = true;
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Accept-Language', 'en');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

    // Onclude body msg if needed
    xhr.send();
  });
};

var createCORSRequest = function (method, url) {
  var xhr = new XMLHttpRequest();
  if ('withCredentials' in xhr) {
    // Most browsers.
    xhr.open(method, url, true);
  }
  // else if (typeof XDomainRequest != "undefined") {
  //   // IE8 & IE9
  //   xhr = new XDomainRequest();
  //   xhr.open(method, url);
  // }
  else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
};
