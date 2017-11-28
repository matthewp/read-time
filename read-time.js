class ReadTime extends HTMLElement {
  static get observedAttributes() {
    return ['selector', 'wpm'];
  }

  constructor() {
    super();
    this._selector = this.getAttribute('selector') || null;
    this._wpm = Number(this.getAttribute('wpm') || 200);
    this._connected = false;
    if(this.attachShadow) {
      this.attachShadow({ mode: 'open' });
      this._root = this.shadowRoot;
    } else {
      this._root = this;
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

export default ReadTime;

customElements.define('read-time', ReadTime);
