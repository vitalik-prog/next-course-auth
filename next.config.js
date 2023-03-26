const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      },
    };
  }

  return {
    env: {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    },
  };
};
