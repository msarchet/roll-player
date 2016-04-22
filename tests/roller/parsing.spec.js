'use strict';

const expect = require('chai').expect;
const roller = require('../../src/roller');

const mockRoll = (values, sides) => {
  return {
    isRoll: true,
    type: 'mockRoll',
    sides,
    values: values.map(v => { return { roll: v }}),
  }
};
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

  describe('rerolling dice', () => {
    it('should handle one time rerolls', done=> {
      roller.parse('2d6ro1', (err, parsed) => {
        expect(parsed).to.deep.equal(['2', '6', 'd', '1', 'ro']);
        done();
      });
    });

    it('should handle a reroll', done => {
      roller.parse('2d6r1', (err, parsed) => {
        expect(parsed).to.deep.equal(['2', '6', 'd', '1', 'r']);
        done();
      });
    });

    it('should handle rerolls with a less target', done => {
      roller.parse('2d6r<1', (err, parsed) => {
        expect(parsed).to.deep.equal(['2', '6', 'd', '1', 'r<']);
        done();
      });
    });

    it('should handle rerolls with a greater target', done => {
      roller.parse('2d6r>1', (err, parsed) => {
        expect(parsed).to.deep.equal(['2', '6', 'd', '1', 'r>']);
        done();
      });
    });
  });

  describe('With a modifier', () => {
    it('should handle a positive modifier', done => {
      roller.parse('2d6+1', (err, parsed) => {
        expect(parsed).to.deep.equal(['2', '6', 'd', '1', '+']);
        done();
      });
    });

    it('should handle a negative modifier', done => {
      roller.parse('2d6-1', (err, parsed) => {
        expect(parsed).to.deep.equal(['2', '6', 'd', '1', '-']);
        done();
      });
    });
    
    it('should handle a roll as a modifier', done => {
      roller.parse('2d6+3d8', (err, parsed) => {
        expect(parsed).to.deep.equal(['2', '6', 'd', '3', '8', 'd', '+']);
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
      // additonally we should mock out random-js to return known rolls
      // this will allow testing of the reroll logic indepth


      it('should reroll any die with the provided target', done => {
        let roll = mockRoll([2,1], 2);
        let rerolled = roller.reroll(roll, 1, 'r');
        expect(rerolled.values).to.have.length(2);
        expect(rerolled.values[0]).to.have.property('roll').to.equal(2);
        expect(rerolled.values[1]).to.have.property('roll').to.equal(2);
        expect(rerolled.values[1]).to.have.property('rerollCount');
        done();
      });

      it('should reroll once any die with the provided target', done => {
        let roll = mockRoll([2,1], 2);
        let rerolled = roller.reroll(roll, 1, 'ro');
        expect(rerolled.values).to.have.length(2);
        expect(rerolled.values[0]).to.have.property('roll').to.equal(2);
        expect(rerolled.values[1]).to.have.property('roll');
        expect(rerolled.values[1]).to.have.property('rerollCount').to.equal(1);
        done();
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

      it('should add modifiers to rerolled dice', done => {
        roller.parse('4d1k3+1', (err, parsed) => {
          roller.roll(parsed, (_err, rolled) => {
            expect(rolled.value()).to.equal(4);
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
