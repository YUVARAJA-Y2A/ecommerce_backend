
let { InternalAPIs } = require('../configs');
let { Rest } = require('../restCalls')


class externalServices { }

// Auth API 
externalServices.verifyToken = async (headers) => {
    try {
        let urlPayload = JSON.parse(JSON.stringify(InternalAPIs.userTokenVerification));
        if (headers.authorization) {
            urlPayload.headers.authorization = headers.authorization;
        } else if (headers['x-access-token']) {
            urlPayload.headers.authorization = headers['x-access-token']
        }
        //urlPayload.headers.authorization = headers.authorization;
        urlPayload.headers['content-type'] = headers['content-type'] ? headers['content-type'] : 'application/json';
        let verifyStatus = await Rest.callApi(urlPayload);
        return verifyStatus.user;
    } catch (err) {
        console.log('>>>>>>', err.message)
        throw new Error(err.message);
    }

} 

externalServices.getCityBySlug = async (body) => {
    try {
       let urlPayload = {
        method: "POST",
        url: `${PRODUCT_SERVICE}/location/getCityBySlug`,
        data: body,
        headers: {
          contentType: "application/json",
        },
      };
      let response = await Rest.callApi(urlPayload);
      return response.data; 
    } catch (err) {
      console.log(">>>>>>", err.message);
      throw new Error(err.message);
    }
};


module.exports = externalServices;