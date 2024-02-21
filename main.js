class Tabs {

  constructor(option = {}) {

    this.option = option;

    this.TAB_ACTIVE = this.option.tabActiveSelect ? this.option.tabActiveSelect : "tab-active";
    this.CONTENT_ACTIVE = this.option.contentActiveSelect ? this.option.contentActiveSelect : "tab-content-active";
    this.TAB_DATA_NAME = this.option.tabDataName ? this.option.tabDataName : "tab";
    this.CONTENT_DATA_NAME = this.option.contentDataName ? this.option.contentDataName : "tab-content";

    this.tab = document.querySelectorAll(`[data-${this.TAB_DATA_NAME}]`);
    this.click();
  }

  click() {

    if (this.tab.length > 0) {

      let newDataName = this.#convertString();

      this.tab.forEach(t => {
        t.addEventListener('click', (ev) => {

          if (ev.target.classList.contains(this.TAB_ACTIVE)) {
            return;
          }

          const currentContent = document.querySelector(`[data-${this.CONTENT_DATA_NAME}="${ev.target.dataset[newDataName]}"]`);

          const currentTabActive = document.querySelector("." + this.TAB_ACTIVE);
          const currentContentActive = document.querySelector("." + this.CONTENT_ACTIVE);

          currentTabActive ? currentTabActive.classList.remove(this.TAB_ACTIVE) : "";
          currentContentActive ? currentContentActive.classList.remove(this.CONTENT_ACTIVE) : "";

          if (currentContent) {
            currentContent.classList.add(this.CONTENT_ACTIVE);
          }

          t.classList.add(this.TAB_ACTIVE);

        })
      })
    }
  }

  #convertString() {
    let str = this.TAB_DATA_NAME;
    let i = -1;
    while ((i = str.indexOf('-', i + 1)) != -1) {
      str = str.substr(0, i + 1) + str[i + 1].toUpperCase() + str.substr(i + 2);
    }
    str = str.replace(/[\.\-/\\\s]/g, '');
    return str
  }
}



new Tabs({
  tabActiveSelect: "tab-active",
  contentActiveSelect: "tab-content-active",
  tabDataName: "tab-btn",
  contentDataName: 'tab-content'
})