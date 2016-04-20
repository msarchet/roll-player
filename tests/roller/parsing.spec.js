'use strict';

const expect = require('chai').expect;
const roller = require('../../src/roller');
describe('Die parsing', () => {
  describe('Basics', () => {
    it('should return the number of dice', (done) => {
      let parsed = roller.parse('2d6', (err, parsed) => {
        expect(err).to.equal(null);
        expect(parsed).to.deep.equal(['2', '6', 'd']);
        done();
      });
    });

    it('should return one die if no dice count is passed', () => {
      let parsed = roller.parse('d6', (err, parsed) => {
        expect(parsed).to.deep.equal(['6', 'd']);
      });
    });
  });
  describe('With a modifier', () => {
    it('should handle a positive modifier', done => {
      let parsed = roller.parse('2d6+1', (err, parsed) => {
        expect(parsed).to.deep.equal(['2', '6', 'd', '1', '+']);
        done();
      });
    });
    it('should handle a negative modifier', done => {
      let parsed = roller.parse('2d6-1', (err, parsed) => {
        expect(parsed).to.deep.equal(['2', '6', 'd', '1', '-']);
        done();
      });
    });

    it('should handle one time rerolls', done=> {
      roller.parse('2d6ro1', (err, parsed) => {
        expect(parsed).to.deep.equal(['2', '6', 'd', '1', 'ro']);
        done();
      });
    });

    it('should handle multidigit rolls', done => {
      roller.parse('2d20', (err, parsed) => {
        expect(parsed).to.deep.equal(['2', '20', 'd']);
        done();
      });
    });

    it('shoudld handle multidigit complex rolls', done => {
      roller.parse('20d20k10+2', (err, parsed) => {
        expect(parsed).to.deep.equal(['20', '20', 'd', '10', 'k', '2', '+']);
        done();
      });
    });
  });

  describe('with a keep', () => {
    it('should handle keeps', done => {
      roller.parse('4d6k3', (err, parsed) => {
        expect(parsed).to.deep.equal(['4', '6', 'd', '3', 'k']);
        done();
      });
    })
  });
});

describe('Die Rolling', () => {
  describe('Basics', () => {
    it('should roll the parsed die correctly', (done) => {
      let parsed = roller.parse('2d6', (err, parsed) => {
        expect(err).to.equal(null);
        roller.roll(parsed, (_err, rolled) => {
          expect(rolled.type).to.equal('roll');
          expect(rolled.number).to.equal('2');
          expect(rolled.sides).to.equal('6');
          expect(rolled.values).to.have.property('length').to.equal(2);
          done();
        });
      });
    });


    it('should adjust the roll with any modifiers', done => {
      roller.parse('1d1+1', (err, parsed) => {
        expect(err).to.equal(null);
        roller.roll(parsed, (_err, rolled) => {
          expect(rolled.value()).to.equal(2);
          done();
        });
      });
    });

    describe('keeping', () => {
      it('should keep the approriate number of rolls', done => {
        roller.parse('4d1k3', (err, parsed) => {
          roller.roll(parsed, (_err, rolled) => {
            expect(rolled.value()).to.equal(3);
            done();
          });
        });
      });

      it('should keep the correct rolls', done => {
        roller.parse('4d6k3', (err, parsed) => {
          roller.roll(parsed, (_err, rolled) => {
            // find the 'lowest' value from the original Roll
            let orginalRolls = rolled.originalRoll.values.sort((a,b) => a > b ? -1 : 1);
            rolled.values.forEach((keptValue) => {
              expect(keptValue >= orginalRolls[3]).to.equal(true); 
            });
            done();
          });
        })
      });
    });

    describe('reroll', () => {
      it('should reroll any die with the provided target', done => {
        roller.parse('10d6r1', (err, parsed) => {
          roller.roll(parsed, (_err, rolled) => {
            console.log('values for 1', rolled.values);
            done();
          });
        });
      });
      it('should reroll once any die with the provided target', done => {
        roller.parse('10d6ro1', (err, parsed) => {
          roller.roll(parsed, (_err, rolled) => {
            console.log('values for one reroll', rolled.values);
            done();
          });
        });
      });
      it('should be able to reroll multiple times', done => {
        roller.parse('10d6r1r2r3', (err, parsed) => {
          roller.roll(parsed, (_err, rolled) => {
            console.log('values', rolled.values);
            done();
          });
        });
      });
    })
    describe('combined', () => {
      it('should add modifiers to kept rolls', done => {
        roller.parse('4d6k3+1', (err, parsed) => {
          roller.roll(parsed, (_err, rolled) => {
            expect(rolled.originalRoll.value()).to.equal(rolled.value() - 1);
            done();
          }); 
        });
      });

      it('should handle a complex roll', done => {
        roller.parse('9d9+4d6k3+2', (err, parsed) => {
          roller.roll(parsed, (_err, rolled) => {
            let final = rolled.value();
            let d9Value = rolled.originalRoll.value();
            let d6Value = rolled.modifier.originalRoll.value();
            expect(final).to.equal(d9Value + d6Value + 2);
            done();
          });
        });
      })
    });
  });
});
