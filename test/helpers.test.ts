import { Helpers } from '../src/helpers';

describe('Helpers', () => {
  describe('cleanify', () => {
    it('should return cleaned string', () => {
      const message: string = 'This\nis a short\n mocked message.';
      expect(Helpers.cleanify(message)).toEqual('This is a short mocked message.')
    });
  });

  describe('isDirExists', () => {
    it('should return true or false', () => {
      //
    })
  })
});
