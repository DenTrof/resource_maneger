import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`

 .input-group-text {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding: .375rem .75rem;
    margin-bottom: 0;
    font-size: .875rem;
    font-weight: 400;
    line-height: 1.5;
    color: #3e515b;
    text-align: center;
    white-space: nowrap;
    background-color: #f0f3f5;
    border: 1px solid #c2cfd6;
}


.rw-multiselect-tag {  
    background-color: #fff; 
   border: none; 
  
}

.icon-user, .icon-lock {
        line-height: 1.6;
   
}
.rw-popup-transition{
	padding: 0 2px!important;
}
/*form > div :focus {
  border: 2px solid #6de86d;
} */

.py-5 {
    max-width: 400px;
}


.mr-sm-2 {
    margin-top: 10px;
}

.rw-widget-picker {
    height: 3.6em;
}

.rw-widget-input, .rw-widget-picker, .rw-widget-container{
  border: 1px solid #ccc;
}

h1, h3{
  font-style: italic;
}

.rw-multiselect .rw-input-reset {
    padding: 0;
    width:22px;
}

.rw-popup-container {
    left: -2px;
    right: -2px;
}

.visitForm{ 
  width: 10%;
  max-height: 32px; 
}

.visitFormCtr{
  width: 100%;
  max-height: 32px; 
}
.my-custom-class{ margin-left: 20px; }  


.siteForm{ 
  max-width: 75px;
   max-height: 32px;
}
.weightForm, .CTRForm{
  max-width: 49px;
   max-height: 32px;
}
.ctr_form_div {
  margin: 2px 2px;
}
.sort-column{padding-left: 15px!important;} 

.app-header.navbar .navbar-brand {
    background-size: 130px auto;
    width: 165px;
    border-bottom: 1px solid #c2cfd6;
}
.sidebar {
 
}

.ReactModal__Overlay--after-open {
    display: none;
}
.adsenseForm{ max-width: 45px; }

.react-bs-container-header, .react-bs-table-tool-bar {display: fixed}

.table td {
    padding: 0.5rem!important;
    vertical-align: middle;
}

.btn-group > .btn{
  border-radius: 5px;
}

.page-link, .pagination li a, .mr-sm-2{
  border-radius: 5px;
}    
.card-header, .nav-tabs .nav-link.active{
/*background-image: linear-gradient(white, #d5d5d5);*/
 border-top-left-radius:5px; 
 border-top-right-radius:5px;
 font-weight: bold;
}
a:not([href]):not([tabindex]) {
  border-top-left-radius:5px; 
  border-top-right-radius:5px;
}

.dateTime .rw-widget-input {
    border: 0px!important; 
}

.master_catecory .rw-select {
	display: none;
}
input, textarea, button, select {
    border-radius: 5px;
    border: 1px solid #ddd;
}
.switch.switch-text {
    margin-top: 5px;
    width: 68px;
    height: 25px;
}
.switch.switch-text .switch-label {
    border-radius: 5px;
}
.switch.switch-text .switch-handle {
    top: 3px;
}
.table-border{
  border-radius: 5px;
}    
.switch.switch-text .switch-label {
    background-color: #f7f7f7;
}
.tab-content {
    border-top-right-radius: 5px;
    min-height: 460px;
}
/*.card-body{min-height: 460px;}*/

.rw-btn-select{
 background-image: none!important;
    border: 0!important;
}
@media (max-width: 990px){
.d-md-down-none {
    display: inline-block!important;
    width:100%;
}

@media (max-width: 568px)
.col-md-8 {
    flex: 0 0 86.66667%;
    max-width: 86.66667%;
}

}
.bg-primary {
   background-image: linear-gradient(#2569a2, #2569a2)
}

.page-link, .pagination li a{padding: 0.22rem 0.75rem;}
.rw-popup-container {background-color: #fff;}

.rw-list-option.rw-state-selected, .rw-list-option.rw-state-selected:hover {
    background-color: none; 
    border-color: none; 
    color: #00BCD4;
}

.rw-list-option.rw-state-focus, .rw-list-option.rw-state-focus:hover {
    border-color: none;    
}
.rw-list-option {
    padding: .343em .75em!important;
    outline: 0;
}

.rw-list-option.rw-state-focus, .rw-list-option.rw-state-focus:hover {
    border-color: none;
}

.statusForm{
  display: flex;
}
.statusLink{flex: 5;}
.statusSite{flex: 2;}

.table th, .table td {
    padding: 0.15rem;
}

.form_modal div{
  margin-top: 5px;
  min-height: 42px;
}

.form_modal {
  width: 100%;
}

input, textarea {padding: 12px;}
tr > td{text-align: cenetr!important;}

.start_stop{
  min-width: 100px;
  max-height: 28px;
}
.btn{padding: 0.3rem 0.75rem;}

.game_name{font-weight: bold;}



  // 0636358442


@charset "UTF-8";
/* http://prismjs.com/download.html?themes=prism&languages=clike+javascript&plugins=line-highlight+line-numbers */
/**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 */
code[class*="language-"],
pre[class*="language-"] {
  color: black;
  background: none;
  text-shadow: 0 1px white;
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  -moz-tab-size: 4;
  tab-size: 4;
  -webkit-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

pre[class*="language-"]::-moz-selection pre[class*="language-"] ::-moz-selection,
code[class*="language-"]::-moz-selection code[class*="language-"] ::-moz-selection {
  text-shadow: none;
  background: #b3d4fc;
}

pre[class*="language-"]::selection pre[class*="language-"] ::selection,
code[class*="language-"]::selection code[class*="language-"] ::selection {
  text-shadow: none;
  background: #b3d4fc;
}

@media print {
  code[class*="language-"],
  pre[class*="language-"] {
    text-shadow: none;
  }
}

/* Code blocks */
pre[class*="language-"] {
  padding: 1em;
  margin: .5em 0;
  overflow: auto;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
  background: #f5f2f0;
}

/* Inline code */
:not(pre) > code[class*="language-"] {
  padding: .1em;
  border-radius: .3em;
  white-space: normal;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: slategray;
}

.token.punctuation {
  color: #999;
}

.namespace {
  opacity: .7;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
  color: #905;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
  color: #690;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  color: #a67f59;
  background: rgba(255, 255, 255, 0.5);
}

.token.atrule,
.token.attr-value,
.token.keyword {
  color: #07a;
}

.token.function {
  color: #DD4A68;
}

.token.regex,
.token.important,
.token.variable {
  color: #e90;
}

.token.important,
.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

pre[data-line] {
  position: relative;
  padding: 1em 0 1em 3em;
}

.line-highlight {
  position: absolute;
  left: 0;
  right: 0;
  padding: inherit 0;
  margin-top: 1em;
  /* Same as .prism’s padding-top */
  background: rgba(153, 122, 102, 0.08);
  background: linear-gradient(left, rgba(153, 122, 102, 0.1) 70%, rgba(153, 122, 102, 0));
  pointer-events: none;
  line-height: inherit;
  white-space: pre;
}

.line-highlight:before,
.line-highlight[data-end]:after {
  content: attr(data-start);
  position: absolute;
  top: .4em;
  left: .6em;
  min-width: 1em;
  padding: 0 .5em;
  background-color: rgba(153, 122, 102, 0.4);
  color: #f5f2f0;
  font: bold 65%/1.5 sans-serif;
  text-align: center;
  vertical-align: .3em;
  border-radius: 999px;
  text-shadow: none;
  box-shadow: 0 1px white;
}

.line-highlight[data-end]:after {
  content: attr(data-end);
  top: auto;
  bottom: .4em;
}

pre.line-numbers {
  position: relative;
  padding-left: 3.8em;
  counter-reset: linenumber;
}

pre.line-numbers > code {
  position: relative;
}

.line-numbers .line-numbers-rows {
  position: absolute;
  pointer-events: none;
  top: 0;
  font-size: 100%;
  left: -3.8em;
  width: 3em;
  /* works for line-numbers below 1000 lines */
  letter-spacing: -1px;
  border-right: 1px solid #999;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.line-numbers-rows > span {
  pointer-events: none;
  display: block;
  counter-increment: linenumber;
}

.line-numbers-rows > span:before {
  content: counter(linenumber);
  color: #999;
  display: block;
  padding-right: 0.8em;
  text-align: right;
}

form {
  font-size: 16px;
}

form > div {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: row nowrap;
      flex-flow: row nowrap;
  -ms-flex-pack: center;
      justify-content: flex-end;
  margin: 10px 5px;
}

form > div > label {
  font-weight: bold;
  margin-right: 2px;
  min-width: 100px;
  text-align: right;
  padding: 6px 9px;
}

form > div > div {
  -ms-flex: 1;
      flex: 1;
  max-width: 500px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: column nowrap;
      flex-flow: column nowrap;
  position: relative;
  border-radius: 5px;
  /*padding: 2px 4px;*/

}

form > div > div >*  {
  -ms-flex: 1;
      flex: 1;
  font-size: 12px;
 /*padding: 8px 8px;
  border: 1px solid #ccc;*/
}

form > div > div > *[type='checkbox'] {
  margin: 8px 0;
  padding: 0;
}


form > div > div > select {
  height: 29px;
}

form > div > div > label {
  border: none;
  padding-left: 0;
}

form > div > div > span {
  border: none;
  font-weight: bold;
  color: #700;
}

form > div > div > span:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: '!!!';
  margin-right: 5px;
}

form > div > div.async-validating:after {
  content: '';
  position: absolute;
  top: 7px;
  right: 7px;
  z-index: 200;
  height: 16px;
  width: 16px;
  background-image: url(data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==);
}

form > div button {
  margin: 2px;
}

form > div button[type='button'] {
  white-space: nowrap;
  display: inline-block;
  border-radius: 5px;
  padding: 5px 6px;
  /*font-size: 20px;*/
  color: white;
  background-image: linear-gradient(white, #d5d5d5);
  border: 1px solid #d5d5d5;
  color: black;
}

form > div button[type='button']:visited {
  color: white;
}

form > div button[type='button']:hover {
  background-image: linear-gradient(white, #eee);
}

form > div button[type='button']:hover[disabled] {
  background-image: linear-gradient(white, #d5d5d5);
}

form > div button[type='button']:visited {
  color: black;
}

form > div button[type='button'][disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

form > div button[type='submit'] {
  white-space: nowrap;
  display: inline-block;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  color: white;
  background-image: linear-gradient(#4f93ce, #285f8f);
  border: 1px solid #285f8f;
}

form > div button[type='submit']:visited {
  color: white;
}

form > div button[type='submit']:hover {
  background-image: linear-gradient(#63a0d4, #337ab7);
}

form > div button[type='submit']:hover[disabled] {
  background-image: linear-gradient(#4f93ce, #285f8f);
}

form > div button[type='submit']:visited {
  color: black;
}

form > div button[type='submit'][disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

form > div button[type='submit'].submitting {
  cursor: wait !important;
}

form > div button[type='submit']:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*content: '»»';*/
  margin-right: 5px;
}

form > div button[type='submit'].next:before {
  content: '';
  margin-right: 0;
}

form > div button[type='submit'].next:after {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: '\F054';
  margin-left: 5px;
}

form > div button.previous:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: '\F053';
  margin-right: 5px;
}

@media (max-width: 400px) {
  form > div {
    -ms-flex-flow: column nowrap;
        flex-flow: column nowrap;
        
}
  form > div > label {
    text-align: left;
  }
  form > div > div {
    -ms-flex-flow: column-reverse nowrap;
        flex-flow: column-reverse nowrap;
  }
}

form > strong {
  font-weight: bold;
  color: #700;
  display: block;
  text-align: center;
}

form > strong:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*content: '\F06A';*/
  margin-right: 5px;
}

form button {
  cursor: pointer;
}

form ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

form ul li {
  margin: 0;
  padding: 15px;
  background-image: linear-gradient(#efefef, #eee);
  clear: both;
}

.rw-list-option {
	background-image: linear-gradient(#fff, #fff);
}

.rw-list-option:hover {
	background-image: linear-gradient(#ddd, #ddd)!important;
}

form ul li ul li {
  background-image: linear-gradient(#ccefcc, #cec);
}

form ul li ul li:nth-child(odd) {
  background-image: linear-gradient(#ccdfcc, #cdc);
}

form ul li ul li:first-child {
  background-image: none;
}

form ul li.error {
  background-image: linear-gradient(#efcccc, #ecc) !important;
  text-align: center;
  font-weight: bold;
  color: #700;
}

form ul li.error:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*content: '\F06A';*/
  margin-right: 5px;
}

form ul li > div {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: row nowrap;
      flex-flow: row nowrap;
  -ms-flex-pack: center;
      justify-content: center;
  margin: 10px 5px;
}

form ul li > div > label {
  font-weight: bold;
  margin-right: 10px;
  min-width: 150px;
  text-align: right;
  padding: 6px 9px;
}

form ul li > div > div {
  -ms-flex: 1;
      flex: 1;
  max-width: 500px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: column nowrap;
      flex-flow: column nowrap;
  position: relative;
}

form ul li > div > div > * {
  -ms-flex: 1;
      flex: 1;
  font-size: 16px;
  padding: 5px 8px;
  border: 1px solid #ccc;
}

form ul li > div > div > *[type='checkbox'] {
  margin: 8px 0;
  padding: 0;
}

form ul li > div > div > select {
  height: 29px;
}

form ul li > div > div > label {
  border: none;
  padding-left: 0;
}

form ul li > div > div > span {
  border: none;
  font-weight: bold;
  color: #700;
}

form ul li > div > div > span:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*content: '\F06A';*/
  margin-right: 5px;
}

form ul li > div > div.async-validating:after {
  content: '';
  position: absolute;
  top: 7px;
  right: 7px;
  z-index: 200;
  height: 16px;
  width: 16px;
  background-image: url(data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==);
}

form ul li > div button {
  margin: 10px;
}

.rw-multiselect .rw-input-reset {
  height: calc(2.029em - 2px); 
 /* float: left;*/ 
}

.sponsors {padding: 0!important;}



form ul li > div button[type='button'] {
  white-space: nowrap;
  display: inline-block;
  border-radius: 5px;
  /*padding: 5px 5px;*/
  font-size: 20px;
  color: white;
  background-image: linear-gradient(white, #d5d5d5);
  border: 1px solid #d5d5d5;
  color: black;
}

form ul li > div button[type='button']:visited {
  color: white;
}

form ul li > div button[type='button']:hover {
  background-image: linear-gradient(white, #eee);
}

form ul li > div button[type='button']:hover[disabled] {
  background-image: linear-gradient(white, #d5d5d5);
}

form ul li > div button[type='button']:visited {
  color: black;
}

form ul li > div button[type='button'][disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

form ul li > div button[type='submit'] {
  white-space: nowrap;
  display: inline-block;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 20px;
  color: white;
  background-image: linear-gradient(#4f93ce, #285f8f);
  border: 1px solid #285f8f;
}

form ul li > div button[type='submit']:visited {
  color: white;
}

form ul li > div button[type='submit']:hover {
  background-image: linear-gradient(#63a0d4, #337ab7);
}

form ul li > div button[type='submit']:hover[disabled] {
  background-image: linear-gradient(#4f93ce, #285f8f);
}

form ul li > div button[type='submit']:visited {
  color: black;
}

form ul li > div button[type='submit'][disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

form ul li > div button[type='submit'].submitting {
  cursor: wait !important;
}

form ul li > div button[type='submit']:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: '\F1D8';
  margin-right: 5px;
}

form ul li > div button[type='submit'].next:before {
  content: '';
  margin-right: 0;
}

form ul li > div button[type='submit'].next:after {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: '\F054';
  margin-left: 5px;
}

form ul li > div button.previous:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: '\F053';
  margin-right: 5px;
}

@media (max-width: 400px) {
  form ul li > div {
    -ms-flex-flow: column nowrap;
        flex-flow: column nowrap;
  }
  form ul li > div > label {
    text-align: left;
  }
  form ul li > div > div {
    -ms-flex-flow: column-reverse nowrap;
        flex-flow: column-reverse nowrap;
  } 

form ul li > button {
  float: right;
  white-space: nowrap;
  display: inline-block;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 20px;
  color: white;
  background-image: linear-gradient(#e27c79, #c9302c);
  border: 1px solid #c9302c;
  padding: 5px 8px;
}

form ul li > button:visited {
  color: white;
}

form ul li > button:hover {
  background-image: linear-gradient(#e7908e, #d9534f);
}

form ul li > button:hover[disabled] {
  background-image: linear-gradient(#e27c79, #c9302c);
}

form ul li > button:visited {
  color: black;
}

form ul li > button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

form ul li > button:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: '\F1F8';
}

form ul li:nth-child(odd) {
  background-image: linear-gradient(#dfdfdf, #ddd);
}

form ul li:first-child {
  background-image: none;
 /* text-align: center;*/
}

form ul li:first-child button {
  float: none;
  white-space: nowrap;
  display: inline-block;
  border-radius: 5px;
 /* padding: 5px 5px;*/
  font-size: 20px;
  color: white;
  background-image: linear-gradient(white, #d5d5d5);
  border: 1px solid #d5d5d5;
  color: black;
}



form ul li:first-child button:visited {
  color: white;
}

form ul li:first-child button:hover {
  background-image: linear-gradient(white, #eee);
}

form ul li:first-child button:hover[disabled] {
  background-image: linear-gradient(white, #d5d5d5);
}

form ul li:first-child button:visited {
  color: black;
}

form ul li:first-child button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

form ul li:first-child button:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*content: '\F067';*/
  margin-right: 5px;
}

form ul li:first-child > span {
  display: block;
  margin-top: 6px;
  font-weight: bold;
  color: #700;
}

form ul li:first-child > span:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*content: '\F06A';*/
  margin-right: 5px;
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
font,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
figure {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  max-width: inherit;
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Neue', Helvetica, 'Segoe UI', Arial, freesans, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  line-height: 1.4em;
  font-size: 14px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: bold;
  line-height: 1.2em;
  margin: 10px 0;
}

h1 {
  font-size: 2.5rem;
  margin: 25px 0;
}

h2 {
  font-size: 2rem;
  margin: 20px 0;
}

h3 {
  font-size: 1.4rem;
  margin: 15px 0;
}

h4 {
  font-size: 1.2rem;
  margin: 12px 0;
}

input,
textarea,
button,
select {
  outline: none;
}

p {
  margin: 8px 0;
}

li {
  margin-left: 20px;
}

:not(pre) > code[class*='language-'],
pre[class*='language-'] {
  background: none;
}

pre[class*='language-'] {
  margin: 0 15px;
  padding: 0;
}

code {
  margin: 0 2px;
}
.background-image-container {
 color:#000;
}

 `;

