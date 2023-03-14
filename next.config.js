const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: '270vitalik270',
        mongodb_password: 'HLqxz1WVGKDtoGfT',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'my-site-auth-dev',
      },
    };
  }

  return {
    env: {
      mongodb_username: '270vitalik270',
      mongodb_password: 'HLqxz1WVGKDtoGfT',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'my-site-auth',
    },
  };
};
