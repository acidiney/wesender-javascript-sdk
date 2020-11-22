const axios = require('axios')
/**
 * @description A javascript sdk to WeSender api
 * @license MIT
 * @version 1.0.0
 * @author Acidiney Dias <acidineydias@gmail.com>
 */
class WeSenderSDK {
  constructor() {
    this._url = process.env.API_URL;
    this._apiKey = '';
    this._destinies = [];
    this._message = '';
    this._hasSpecialCharacters = false;
  }

  /**
   * set apiKey
   * @param {string} apiKey 
   */
  setApiKey(apiKey) {
    this._apiKey = apiKey.trim();
    return this;
  }

  get showApiKey() {
    return this._apiKey;
  }

  /**
   * set a list of destinies
   * @param {object[]} destinies 
   * 
   * @throws { Error }
   */
  setDestinies(destinies) {
    if (!(destinies instanceof Array)) throw new Error('Destinies need to be an array of contact numbers');

    this._destinies = destinies;
    return this;
  }

  /**
   * @param { number|string } destine
   * 
   * @throws { Error }
   */
  setDestine(destine) {
    if (destine instanceof Array) throw new Error('Destine need to be a contact number');

    this._destinies.push(destine);
    return this;
  }

  get destinies() {
    return this._destinies;
  }

  /**
   * 
   * @param {string} message 
   */
  setMessage(message) {
    this._message = message.trim();
    return this;
  }

  get message() {
    return this._message;
  }

  setSpecialCharacters() {
    this._hasSpecialCharacters = true;
    return this;
  }

  transformRequestPayload() {
    return {
      ApiKey: this._apiKey,
      Destino: this._destinies,
      Mensagem: this._message,
      CEspeciais: this._hasSpecialCharacters,
    }
  }

  async send() {
    const payload = this.transformRequestPayload()

    try {
      const { data } = await axios.post(this._url, payload)
      return data
    } catch (e) {
      throw new Error(e.response.data.Message)
    }
  }
}

module.exports = WeSenderSDK
