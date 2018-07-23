var Engine =  require('json-rules-engine').Engine;

var engine = new Engine();

engine.addRule({
    conditions: {
      any: [{
        all: [{
          fact: 'gameDuration',
          operator: 'equal',
          value: 40
        }, {
          fact: 'personalFoulCount',
          operator: 'greaterThanInclusive',
          value: 5
        }]
      }, {
        all: [{
          fact: 'gameDuration',
          operator: 'equal',
          value: 48
        }, {
          fact: 'personalFoulCount',
          operator: 'greaterThanInclusive',
          value: 6
        }]
      }]
    },
    event: {  // define the event to fire when the conditions evaluate truthy
      type: 'fouledOut',
      params: {
        message: 'Player has fouled out!'
      }
    }
  });

  engine.addRule({
    conditions: {
      any: [{
        all: [{
          fact: 'pulledLeg',
          operator: 'equal',
          value: true
        }]
      }]
    },
    event: {  // define the event to fire when the conditions evaluate truthy
      type: 'fouledOut',
      params: {
        message: 'Player has fouled out due to leg pulling!'
      }
    }
  });

  let facts = {
    personalFoulCount: 5,
    gameDuration: 40,
    pulledLeg: false
  }
   
  // Run the engine to evaluate
  engine
    .run(facts)
    .then(events => { // run() returns events with truthy conditions
      events.map(event => console.log(event.params.message))
    })