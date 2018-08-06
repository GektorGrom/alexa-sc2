import Raven from 'raven';

Raven.config(process.env.SENTRY_DSN).install();

const Logger = {};
Logger.error = (e) => {
  Raven.captureException(e);
};
Logger.message = (m) => {
  Raven.captureMessage(m);
};


export default Logger;
