'use babel';

import MyExpressNodejsView from './my-express-nodejs-view';
import { CompositeDisposable } from 'atom';

export default {

  myExpressNodejsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.myExpressNodejsView = new MyExpressNodejsView(state.myExpressNodejsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myExpressNodejsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'my-express-nodejs:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.myExpressNodejsView.destroy();
  },

  serialize() {
    return {
      myExpressNodejsViewState: this.myExpressNodejsView.serialize()
    };
  },

  toggle() {
    console.log('MyExpressNodejs was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
