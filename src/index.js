import _ from 'lodash';
import './style.css';
import Thorn from './thorn.png'

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');
  const myIcon = new Image();
  myIcon.src = Thorn;

  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());