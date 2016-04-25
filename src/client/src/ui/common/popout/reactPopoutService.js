import React from 'react';
import ReactDOM from 'react-dom';
import { PopoutOptions } from './';
import './popoutRegion.scss';

let POPOUT_CONTAINER_ID = 'container_id';

export default class ReactPopoutService {
  openPopout(options:PopoutOptions, view:React.Component) {
    let popoutContainer;
    let windowOptionsString = this._getWindowOptionsString(options.windowOptions);
    let childWindow = window.open(options.url, options.title, windowOptionsString);
    let onloadHandler = () => {
      childWindow.document.title = options.title;
      popoutContainer = childWindow.document.createElement('div');
      popoutContainer.id = POPOUT_CONTAINER_ID;
      childWindow.document.body.appendChild(popoutContainer);
      ReactDOM.render(view, popoutContainer);
    };
    childWindow.onbeforeunload = () =>{
      if(options.onClosing) {
        options.onClosing();
      }
    };
    childWindow.onload = onloadHandler;
  }
  _getWindowOptionsString(windowOptions:any) {
    windowOptions = Object.assign({}, windowOptions);
    if(!windowOptions.height) {
      windowOptions.height = 400;
    }
    if(!windowOptions.width) {
      windowOptions.width = 400;
    }
    windowOptions.top = ((window.innerHeight - windowOptions.height) / 2) + window.screenY;
    windowOptions.left = ((window.innerWidth - windowOptions.width) / 2) + window.screenX;

    let optionsArray = [];
    for (let key in windowOptions){
      windowOptions.hasOwnProperty(key) && optionsArray.push(key + '=' + windowOptions[key]);
    }
    return optionsArray.join(',');
  }
}
