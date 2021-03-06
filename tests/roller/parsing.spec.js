'use strict';

const expect = require('chai').expect;
const roller = require('../../src/roller');
const sinon = require('sinon');
const random = require('random-js');

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
      roller.parse('2d6').then(parsed => {
        expect(parsed).to.deep.equal(['2', '6', 'd']);
        done();
      });
    });

    it('should return one die if no dice count is passed', () => {
      roller.parse('d6').then(parsed => {
        expect(parsed).to.deep.equal(['6', 'd']);
      });
    });

    it('should handle multidigit rolls', done => {
      roller.parse('2d20').then(parsed => {
        expect(parsed).to.deep.equal(['2', '20', 'd']);
        done();
      });
    });

    it('shoudld handle multidigit complex rolls', done => {
      roller.parse('20d20k10+2').then(parsed => {
        expect(parsed).to.deep.equal(['20', '20', 'd', '10', 'k', '2', '+']);
        done();
      });
    });

  });

  describe('rerolling dice', () => {
    it('should handle one time rerolls', done=> {
      roller.parse('2d6ro1').then(parsed => {
        expect(parsed).to.deep.equal(['2', '6', 'd', '1', 'ro']);
        done();
      });
    });

    it('should handle a reroll', done => {
      roller.parse('2d6r1').then(parsed => {
        expect(parsed).to.deep.equal(['2', '6', 'd', '1', 'r']);
        done();
      });
    });

    it('should handle rerolls with a less target', done => {
      roller.parse('2d6r<1').then(parsed => {
        expect(parsed).to.deep.equal(['2', '6', 'd', '1', 'r<']);
        done();
      });
    });

    it('should handle rerolls with a greater target', done => {
      roller.parse('2d6r>1').then(parsed => {
        expect(parsed).to.deep.equal(['2', '6', 'd', '1', 'r>']);
        done();
      });
    });
  });

  describe('With a modifier', () => {
    it('should handle a positive modifier', done => {
      roller.parse('2d6+1').then(parsed => {
        expect(parsed).to.deep.equal(['2', '6', 'd', '1', '+']);
        done();
      });
    });

    it('should handle a negative modifier', done => {
      roller.parse('2d6-1').then(parsed => {
        expect(parsed).to.deep.equal(['2', '6', 'd', '1', '-']);
        done();
      });
    });
    
    it('should handle a roll as a modifier', done => {
      roller.parse('2d6+3d8').then(parsed => {
        expect(parsed).to.deep.equal(['2', '6', 'd', '3', '8', 'd', '+']);
        done();
      }); 
    });
  });

  describe('with a keep', () => {
    it('should handle keeps', done => {
      roller.parse('4d6k3').then(parsed => {
        expect(parsed).to.deep.equal(['4', '6', 'd', '3', 'k']);
        done();
      });
    })
  });
});

describe('Die Rolling', () => {
  describe('Basics', () => {
    it('should roll the parsed die correctly', (done) => {
      roller.roll(['2', '6', 'd']).then(rolled => {
        expect(rolled.type).to.equal('roll');
        expect(rolled.number).to.equal(2);
        expect(rolled.sides).to.equal(6);
        expect(rolled.values).to.have.property('length').to.equal(2);
        done();
      });
    });

    it('should adjust the roll with any modifiers', done => {
      roller.roll(['1', '1', 'd', '1', '+']).then(rolled => {
        expect(rolled.value()).to.equal(2);
        done();
      });
    });

    describe('keeping', () => {
      it('should keep the approriate number of rolls', done => {
        roller.roll(['4', '1', 'd', '3', 'k']).then(rolled => {
          expect(rolled.value()).to.equal(3);
          done();
        });
      });

      it('should keep the correct rolls', done => {
        roller.roll(['4', '6', 'd', '3', 'k']).then(rolled => {
          // find the 'lowest' value from the original Roll
          let orginalRolls = rolled.originalRoll.values.sort((a,b) => a > b ? -1 : 1);
          rolled.values.forEach((keptValue) => {
            expect(keptValue >= orginalRolls[3]).to.equal(true); 
          });
          done();
        });
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
        // need to properly test a rerolled die
        expect(rerolled.values[1]).to.have.property('roll').to.equal(2);
        expect(rerolled.values[1]).to.have.property('rerollCount');
        done();
      });

      it('should reroll once any die with the provided target', done => {
        let roll = mockRoll([2,1], 2);
        let rerolled = roller.reroll(roll, 1, 'ro');
        expect(rerolled.values).to.have.length(2);
        expect(rerolled.values[0]).to.have.property('roll').to.equal(2);
        // need to properly test a rerolled die
        expect(rerolled.values[1]).to.have.property('roll');
        expect(rerolled.values[1]).to.have.property('rerollCount').to.equal(1);
        done();
      });

      it('should be able to reroll multiple times', done => {
        roller.roll(['10', '6', 'd', '1', 'r', '2', 'r', '3', 'r']).then(rolled => {
          console.log('values', rolled.values);
          done();
        });
      });
      
    })
    describe('combined', () => {
      it('should add modifiers to kept rolls', done => {
        // 4d6k3+1
        roller.roll(['4', '6', 'd', '3', 'k', '1', '+']).then(rolled => {
          expect(rolled.originalRoll.value()).to.equal(rolled.value() - 1);
          done();
        }); 
      });

      it('should add modifiers to rerolled dice', done => {
        //4d1k3+1
        roller.roll(['4', '1', 'd', '3', 'k', '1', '+']).then(rolled => {
          expect(rolled.value()).to.equal(4);
          done();
        });
      });

      it('should handle a complex roll', done => {
        // 9d9+4d6k3+2
        roller.roll(['9', '9', 'd', '4', '6', 'd', '3', 'k', '+', '2', '+']).then(rolled => {
          let final = rolled.value();
          let d9Value = rolled.originalRoll.originalRoll.value();
          let d6Value = rolled.originalRoll.modifier.value();
          expect(final).to.equal(d9Value + d6Value + 2);
          done();
        });
      })
    });
  });
});
