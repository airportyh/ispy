;(function(){

function spy(){

  var spy = function(){
    recordCall(arguments, this)
  }
  
  spy.called = false
  spy.callCount = 0
  spy.lastCall = null
  spy.calls = []

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