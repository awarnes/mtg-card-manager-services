const constants = Object.freeze({
  responseSampling: process.env.NODE_ENV === 'production' ? 0 : 0 // TODO: Update this when validation fixed
});

export default constants;
