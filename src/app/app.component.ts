/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';

import {Home} from './home';
import {AppState} from './app.service';
import {RouterActive} from './router-active';

declare var jQuery: any;

interface NavLink {
  comp?: string,
  link?: string,
  text: string
}

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  directives: [ RouterActive ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('./app.scss')
  ],
  template: require('./app.html')
})
@RouteConfig([
  { path: '/',      name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') }
])
export class App {
  appName: string = 'The Factory';
  
  angularclassLogo: string = 'assets/img/angularclass-avatar.png';
  loading: boolean = false;
  name: string = 'Angular 2 Webpack Starter';
  url: string = 'https://twitter.com/AngularClass';
  navLinks: NavLink[] = [
    {
      comp: 'Home',
      text: 'Home'
    }, {
      comp: 'About',
      text: 'About'
    }
  ];


  constructor(
    public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
    console.log(this.navLinks);
    this.tabSelect('pur');
    // jQuery('ul.tabs').tabs();
  }
  
  tabSelect(tabName: string) {
    // TODO: Do tab select stuff.
    // set display: none; for all other tabs
    // use $('ul.tabs').tabs('select_tab', tabID);
    
    let tabNames = ['pur', 'man', 'inv', 'auto'];
    jQuery('ul.tabs').tabs('select_tab', `#${tabName}-tab`);
    jQuery(tabNames.map(tName => `#${tName}-tab`).join(', ')).hide();
    jQuery(`#${tabName}-tab`).show();
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
