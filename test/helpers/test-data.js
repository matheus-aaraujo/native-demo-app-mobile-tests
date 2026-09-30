const { randomUUID } = require('node:crypto');

function buildRandomEmail({ emailPrefix = 'mobile.user', emailDomain = 'test.com' } = {}) {
  const suffix = randomUUID().slice(0, 8);
  return `${emailPrefix}.${suffix}@${emailDomain}`;
}

module.exports = {
  buildRandomEmail
};
