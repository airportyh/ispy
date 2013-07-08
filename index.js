;(function(){

function spy(){

  var spy = function(){
    recordCall(arguments, this)
    spy.notify(arguments, this)
    if ('delegate' in spy){
      return spy.delegate.apply(this, arguments)
    }
    if ('returnValue' in spy) return spy.returnValue
  }
  
  spy.initialize = function(){
    spy.called = false
    spy.callCount = 0
    spy.lastCall = null
    spy.calls = []
    spy.callbacks = []
  }

  spy.reset = spy.initialize

  function recordCall(args, context){
    spy.called = true
    spy.callCount++
    var call = {
      args: Array.prototype.slice.call(args),
      context: context
    }
    spy.calls.push(call)
    spy.lastCall = call
  }

  spy.returns = function(value){
    spy.returnValue = value
    return spy
  }

  spy.delegatesTo = function(fun){
    spy.delegate = fun
    return spy
  }

  spy.on = function(evt, callback){
    if (evt !== 'call') throw new Error('ispy doesn\'t support event ' + evt)
    spy.callbacks.push(callback)
  }

  spy.once = function(evt, callback){
    callback.once = true
    spy.on(evt, callback)
  }

  spy.notify = function(args, cxt){
    var whatsLeft = []
    for (var i = 0; i < spy.callbacks.length; i++){
      var cb = spy.callbacks[i]
      cb.apply(cxt, args)
      if (!cb.once){
        whatsLeft.push(cb)
      }
    }
    spy.callbacks = whatsLeft
  }

  spy.initialize()

  return spy

}

if (typeof define !== 'undefined' && define.amd){
  define(function(){ return spy })
}else if (typeof module !== 'undefined' && module.exports){
  module.exports = spy
}else if (typeof window !== 'undefined'){
  window.ispy = spy
}

}());