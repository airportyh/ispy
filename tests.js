mocha.setup('tdd')
var assert = chai.assert
var spy = window.ispy

test('trips called flag', function(){
  var s = spy()
  assert(!s.called, 'shouldnt have called')
  s()
  assert(s.called, 'how come you dont call?')
})

test('tallies call count', function(){
  var s = spy()
  assert.equal(s.callCount, 0)
  s()
  assert.equal(s.callCount, 1)
  s()
  assert.equal(s.callCount, 2)
})

test('records call args', function(){
  var s = spy()
  s()
  assert.equal(s.calls.length, 1)
  assert.deepEqual(s.calls[0].args, [])
  s(1, 2, 3)
  assert.deepEqual(s.calls[1].args, [1, 2, 3])
})

test('records context', function(){
  var obj = {play: spy()}
  obj.play()
  assert.strictEqual(obj.play.lastCall.context, obj)
})

test('short hand for last call', function(){
  var s = spy()
  s(1)
  assert.deepEqual(s.lastCall.args, [1])
})

test('can specify return value', function(){
  var s = spy().returns(1)
  assert.equal(s(), 1)
})

test('can delegate to a function', function(){
  var s = spy().delegatesTo(function(){ return 2 })
  assert.equal(s(), 2)
})
