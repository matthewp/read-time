(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    factory();
  }
}(this, function(){  

  xtag.register('read-time', {
    lifecycle: {
      inserted: function(){
        this.textContent = this.time;
      }
    },
    accessors: {
      /**
       * CSS selector for content
       */
      selector: { attribute: true },
      /**
       * Words per minute
       * Used to calculate the time it will
       * take to read the article
       */
      wpm: {
        attribute: { number: true }
      },
      /**
       * The time (in minutes) it will take to read the article
       */
      time: {
        get: function(){
          var wpm = +(this.wpm || 200);
          return Math.ceil(this.words / wpm);
        }
      },
      /**
       * The number of words contained within the article
       */
      words: {
        get: function(){
          var selector = this.selector;
          var element = xtag.query(document, selector)[0];
          if(!element) {
            throw new Error('Selector:' + selector + ' not found.');
          }
          var text = element.textContent;
          var words = text.split(' ').length;
          return words;
        }
      }
    }
  });

}));
