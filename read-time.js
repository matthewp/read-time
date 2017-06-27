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

  class ReadTime extends HTMLElement {
    static get observedAttributes() {
      return ['selector', 'wpm'];
    }

    constructor(self) {
      // Make the element pollyfilable with `document-register-element`
      // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
      self = super(self);
      self._selector = self.getAttribute('selector') || null;
      self._wpm = Number(self.getAttribute('wpm') || 200);
      self._connected = false;
      if(self.attachShadow) {
        self.attachShadow({ mode: 'open' });
        self._root = self.shadowRoot;
      } else {
        self._root = self;
      }
    }

    connectedCallback() {
      this.style.display = 'inline';
      this._connected = true;
      this._setTime();
      if(!this._selectedElement()) {
        var win = this.ownerDocument.defaultView;
        win.addEventListener('load', function onload(){
          win.removeEventListener('load', onload);
          this._setTime();
        }.bind(this));
      }
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch(name) {
        case 'selector':
          this.selector = newValue;
          break;
        case 'wpm':
          this.wpm = newValue;
          break;
      }
    }

    /**
     * CSS selector for content
     */
    get selector() {
      return this._selector;
    }

    set selector(val) {
      val = String(val);
      if(this._selector === val) return;
      this._selector = val;
      if(this.hasAttribute('selector')) {
        this.setAttribute('selector', val);
      }
      this._setTime();
    }

    /**
     * Words per minute
     * Used to calculate the time it will
     * take to read the article
     */
    get wpm() {
      return this._wpm;
    }

    set wpm(val) {
      val = Number(val);
      if(this._wpm === val) return;
      this._wpm = val;
      if(this.hasAttribute('wpm')) {
        this.setAttribute('wpm', val);
      }
      this._setTime();
    }

    /**
     * The time (in minutes) it will take to read the article
     */
    get time() {
      return Math.ceil(this.words / this.wpm);
    }

    /**
     * The number of words contained within the article
     */
    get words() {
      var selector = this.selector;
      var element = this._selectedElement();
      if(!element) {
        return 0;
      }
      var text = element.textContent;
      var words = text.split(' ').length;
      return words;
    }

    _selectedElement() {
      return this.ownerDocument.querySelector(this.selector);
    }

    _setTime() {
      if(this._connected) {
        this._root.textContent = this.time;
      }
    }
  }

  customElements.define('read-time', ReadTime);

}));
