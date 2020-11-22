require('dotenv').config({
  path: '.env.testing'
})

const WeSenderSDK = require('../index')

let WDK = new WeSenderSDK();
const destinies = [
  941000000,
  935000000
];

beforeEach(() => {
  WDK = new WeSenderSDK();
})

describe('WeSender SDK', () => {
  it('should add a list of destinies to WDK', () => {

    WDK.setDestinies(destinies);

    expect(WDK.destinies).toBe(destinies)
  })

  it('should throw an error because destinies need to be array', () => {

    expect(
      () => WDK.setDestinies(destinies[0])
    ).toThrowError('Destinies need to be an array of contact numbers')
  })

  it('should add a number to a list of numbers', () => {
    WDK.setDestine(destinies[0]);

    expect(WDK.destinies.length).toBe(1);
  })

  it('should throw an error because cannot pass an array to add only one number', () => {
    expect(() =>
      WDK.setDestine(destinies)
    ).toThrowError('Destine need to be a contact number')
  })

  it('should add a message to send', () => {
    const message = 'Hello, world';

    WDK.setMessage(message);

    expect(WDK.message).toBe(message)
  })

  it('should set an ApiKey', () => {
    const apiKey = '12345678987654323456789';

    WDK.setApiKey(apiKey);

    expect(WDK.showApiKey).toBe(apiKey);
  })

  it('should send a message', async () => {
    const response = await WDK.setApiKey(process.env.API_KEY)
      .setDestine(process.env.PHONE_NUMBER)
      .setMessage('Envio teste!')
      .send();

    expect(response.Exito).toBe(true);
  })
})