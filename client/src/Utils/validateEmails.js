const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default recipients => {
  const invalidaEmails = recipients
    .split(",")
    .map(email => email.trim())
    .filter(email => re.test(email) === false);

  if (invalidaEmails.length) {
    return `These emails are invalid: ${invalidaEmails}`;
  }
};
