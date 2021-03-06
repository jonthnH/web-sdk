//
//  BlockV AG. Copyright (c) 2018, all rights reserved.
//
//  Licensed under the BlockV SDK License (the "License"); you may not use this file or
//  the BlockV SDK except in compliance with the License accompanying it. Unless
//  required by applicable law or agreed to in writing, the BlockV SDK distributed under
//  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
//  ANY KIND, either express or implied. See the License for the specific language
//  governing permissions and limitations under the License.
//

//
// EventEmitter class
// This class provides simple event functionality for classes, with Promise support.
// Usage for once-off event listeners:
//    myObj.when("closed").then(function(data) {
//       alert("Closed! " + data);
//    });
//
// Usage for permanent event listeners:
//    myObj.on("closed", function(data) {
//      alert("Closed! " + data);
//    });
//
// Usage when triggering an event from a subclass:
//    this.emit("closed", "customData");

class EventEmitter {
  /**
   * Adds an event listener. If callback is null, a Promise will be returned.
   * Note that if using the Promise
   * it will only be triggered on the first event emitted. */

  when (eventName, callback = null) {
    // Make sure event listener object exists
    this.privateEventListeners = this.privateEventListeners || {}

    // Make sure event listener array exists
    this.privateEventListeners[eventName] = this.privateEventListeners[eventName] || []

    // Check if using promise form
    if (callback) {
    // Just add the callback
      this.privateEventListeners[eventName].push(callback)
      return null
    }
    // Return the promise
    return new Promise((resolve) => {
      // Promise callbacks can only be used once
      // eslint-disable-next-line no-param-reassign
      resolve.removeAfterCall = true

      // Add success handler to event listener array
      this.privateEventListeners[eventName].push(resolve)
    })
  }

  /** Synonyms */
  on () {
    return this.when.apply(this, arguments)
  }

  addEventListener () {
    return this.when.apply(this, arguments)
  }

  /** Remove event listener */
  removeEventListener (eventName, callback) {
  // Make sure event listener object exists
    this.privateEventListeners = this.privateEventListeners || {}

    // Make sure event listener array exists
    this.privateEventListeners[eventName] = this.privateEventListeners[eventName] || []

    // Find and remove it
    for (let i = 0; i < this.privateEventListeners[eventName].length; i += 1) {
      if (this.privateEventListeners[eventName][i] === callback) {
        this.privateEventListeners[eventName].splice(i, 1)
        i -= 1
      }
    }
  }

  off () {
    return this.removeEventListener.apply(this, arguments)
  }

  /** Triggers an event. Each argument after the first one will be passed to event listeners */
  emit (eventName) {
    // Setup the once-off promise if one of it's events were triggered
    // if (eventName == "success" || eventName == "failed")
    // this._setupPromise();

    // Get list of callbacks
    const callbacks = (this.privateEventListeners && this.privateEventListeners[eventName]) || []
    // Call events
    let passArguments = Array.from(arguments).slice(1)
    callbacks.forEach((callback) => {
      callback.apply(this, passArguments)
    })

    // Remove callbacks that can only be called once
    for (let i = 0; i < callbacks.length; i += 1) {
      if (callbacks[i].removeAfterCall) {
        callbacks.splice(i, 1)
        i -= 1
      }
    }
  }

  /** Synonyms */
  trigger () {
    return this.emit.apply(this, arguments)
  }

  triggerEvent () {
    return this.emit.apply(this, arguments)
  }
}

// Apply as a mixin to a class or object
EventEmitter.mixin = function eventEmitterMixin (otherClass) {
  // eslint-disable-next-line no-restricted-syntax
  for (const prop in EventEmitter.prototype) {
    // eslint-disable-next-line no-prototype-builtins
    if (EventEmitter.prototype.hasOwnProperty(prop)) {
      // eslint-disable-next-line no-param-reassign
      otherClass[prop] = EventEmitter.prototype[prop]
    }
  }
}
module.exports = EventEmitter
