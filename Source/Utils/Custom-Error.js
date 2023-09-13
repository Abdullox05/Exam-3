class Custom_Error extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  };
};

module.exports = Custom_Error;
