function spy(){

  var spy = function(){
    spy._recordCall(arguments, this)
  }
  spy._recordCall = function(args, context){
    spy.called = true
    spy.callCount++
    var call = {
      args: Array.prototype.slice.call(args),
      context: context
    }
    spy.calls.push(call)
    spy.lastCall = call
  }
  spy.called = false
  spy.callCount = 0
  spy.lastCall = null
  spy.calls = []

  return spy

}