const strava = require('strava-v3');

const stravaPromise = (user, resource, method, args = {}) => (
  new Promise((resolve, reject) => {
    strava[resource][method](
      { access_token: user.json.token, ...args },
      (error, result) => {
        if (error) {
          reject(error);
        }
        if (result.errors) {
          reject(result);
        }
        resolve(result);
      }
    );
  })
);

module.exports = stravaPromise;
