export class Section {
  constructor({ renderer }, containerSelector, api) {
    this._renderer = renderer;
    this._container = containerSelector;
    this._api = api;
  }

  renderAll() {
    this._api
      .getInitialCards()
      .then((init) => {
        init.forEach((item) => {
          this._renderer(item);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
