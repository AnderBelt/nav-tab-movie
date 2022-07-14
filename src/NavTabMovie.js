import { LitElement, html, } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './NavTabMovie-styles.js';
import '@capacitacion-practica/list-actor-card/list-actor-card.js';
import '@capacitacion-practica/list-review-card/list-review-card.js';
/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
<nav-tab-movie></nav-tab-movie>
```

##styling-doc

@customElement nav-tab-movie
*/
export class NavTabMovie extends LitElement {
  static get is() {
    return 'nav-tab-movie';
  }

  // Declare properties
  static get properties() {
    return {
      activedTab: { type : Array },
      activedContent: { type : Array },
      dataList: {type: Object}
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.activedTab = ['active','',''];
    this.activedContent = ['show active','','']
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('nav-tab-movie-shared-styles')
    ];
  }
  
  _activeReview(){
    this.activedTab = ['active','',''];
    this.activedContent = ['show active','',''];
    this._runEvent('review');
  }
  _activeActors(){
    this.activedTab = ['','active',''];
    this.activedContent = ['','show active',''];
    this._runEvent('actors');
  }
  _activeContact(){
    this.activedTab = ['','','active'];
    this.activedContent = ['','','show active'];
    this._runEvent('contact');
  }
  _runEvent(value){
    this.dispatchEvent(
      new CustomEvent('navtab-event', {
        bubbles: true,
        composed: true,
        detail: {
          tab: value,
        },
      })
    );
  }

  _setProperties(data) {
    this.dataList = data;
  }

  // Define a template
  render() {
    return html`
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          
          <button class="nav-item nav-link ${this.activedTab[1]}" id="nav-actors-tab" data-toggle="tab" href="#nav-actors" role="tab" aria-controls="nav-actors" @click=${this._activeActors}>Actors</button>
          <button class="nav-item nav-link disabled" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" @click=${this._activeContact}>Contact</button>
          <button class="nav-item nav-link ${this.activedTab[0]}" id="nav-review-tab" data-toggle="tab" href="#nav-review" role="tab" aria-controls="nav-review" @click=${this._activeReview}>Review</button>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        
        <div class="tab-pane fade ${this.activedContent[1]}" id="nav-actors" role="tabpanel" aria-labelledby="nav-actors-tab">
            <list-actor-card .dataList=${this.dataList[1].data} ></list-actor-card>
          </div>
        <div class="tab-pane fade disabled" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">Data de Contact</div>
        <div class="tab-pane fade ${this.activedContent[0]}" id="nav-review" role="tabpanel" aria-labelledby="nav-review-tab">
            <list-review-card .dataList=${this.dataList[0].data}></list-review-card>
        </div>
      </div>
    `;
  }
}
