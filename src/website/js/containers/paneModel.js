export default class PaneModel {
  constructor(pane) {
    this.model = pane;
    this.model.paneId = Math.random().toString();
    this.model.pane.style = this.model.pane.style || {};
  }
}
