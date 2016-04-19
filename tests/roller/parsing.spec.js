'use strict';

const expect = require('chai').expect;
const roller = require('../../src/roller');
describe('Die parsing', () => {
  describe('Basics', () => {
    it('should return the number of dice', (done) => {
      let parsed = roller.parse('2d6', (err, parsed) => {
        expect(err).to.equal(null);
        expect(parsed.dice).to.have.length(2);
        expect(parsed.dice[0]).to.have.property('die').with.property('sides').to.equal(6);
        expect(parsed.dice[1]).to.have.property('die').with.property('sides').to.equal(6);
        done();
      });
    });

    it('should return one die if no dice count is passed', () => {
      let parsed = roller.parse('d6', (err, parsed) => {
        expect(parsed.dice).to.have.length(1);
      });
    });
  });
  describe('With a modifier', () => {
    it('should handle a positive modifier', done => {
      let parsed = roller.parse('2d6+1', (err, parsed) => {
        expect(parsed.modifier).to.equal(1);
        done();
      });
    });
    it('should handle a negative modifier', done => {
      let parsed = roller.parse('2d6-1', (err, parsed) => {
        expect(parsed.modifier).to.equal(-1);
        done();
      });
    });
  });

  describe('with a keep', () => {
    it('should set the keep to the proper count', done => {
      roller.parse('4d6k3', (err, parsed) => {
        expect(err).to.equal(null);
        expect(parsed).to.have.property('keep');
        done();
      });
    })

    it('should error if you try to keep more dice than you roll', done => {
      roller.parse('3d6k4', (err) => {
        expect(err).to.be.a('Error');
        done();
      });
    });
  });
});

describe('Die Rolling', () => {
  describe('Basics', () => {
    it('should roll the parsed die correctly', (done) => {
      let parsed = roller.parse('2d6', (err, parsed) => {
        expect(err).to.equal(null);
        roller.roll(parsed, (_err, rolled) => {
          expect(rolled.dice).to.have.length(2);
          expect(rolled).to.have.property('rolled').to.equal(true);
          expect(rolled.dice[0]).to.have.property('die').with.property('value');
          expect(rolled.dice[1]).to.have.property('die').with.property('value');
          done();
        });
      });
    });

    it('should adjust the roll with any modifiers', done => {
      roller.parse('1d1+1', (err, parsed) => {
        expect(err).to.equal(null);
        roller.roll(parsed, (_err, rolled) => {
          expect(rolled.beforeModifier).to.equal(1);
          expect(rolled.finalValue).to.equal(2);
          done();
        });
      });
    });

    describe('keeping', () => {
      it('should keep the approriate number of rolls', done => {
        roller.parse('4d1k3', (err, parsed) => {
          roller.roll(parsed, (_err, rolled) => {
            expect(rolled.finalValue).to.equal(3);
            done();
          });
        });
      });

      it('should keep the correct rolls', done => {
        roller.parse('4d6k3', (err, parsed) => {
          roller.roll(parsed, (_err, rolled) => {
            rolled.kept.forEach((keptDie) => {
              expect(rolled.dice[3].die.value <= keptDie.die.value).to.equal(true);
            });
            done();
          });
        })
      });
    });

    describe('combined', () => {
      it('should add modifiers to kept rolls', done => {
        roller.parse('4d6k3+1', (err, parsed) => {
          roller.roll(parsed, (_err, rolled) => {
            expect(rolled.beforeModifier).to.equal(rolled.finalValue - 1);
            done();
          }); 
        });
      });
    });
  });
});
