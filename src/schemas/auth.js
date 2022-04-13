exports.authLoginSchema = {
  body: {
    type: 'object',
    properties: {
      login: { type: 'string', minLength: 1, maxLength: 255, required: true },
      password: { type: 'string', minLength: 4, maxLength: 255, required: true }
    },
    additionalProperties: false
  }
};      

exports.authRefreshSchema = {
  body: {
      type: 'object',
      properties: {
        refresh_token: { type: 'string', minLength: 1, required: true }
      },
      additionalProperties: false
  }
};
