const axios = require('axios');

class Rest { }

Rest.prototype.callApi = async (request) => {
    try {
      console.log(request);
      let restResult = await axios(request);
      return restResult.data;
    } catch (err) {
      throw new Error(  
        JSON.stringify({
          code: err.response.status,
          message: err.response.statusText,
        })
      );
    }
  };

module.exports = {
    Rest: new Rest()
}