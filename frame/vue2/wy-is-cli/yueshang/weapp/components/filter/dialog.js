Component({
  properties: {
    overlay: {
      type: Boolean,
      value: true
    },
    type: {
      type: String,
      value: 'normal' // 'primary', 'normal'
    },
    title: {
      type: String
    },
    tip: {
      type: String
    },
    checkboxes: {
      type: Array,
      value: [],
      observer(items) {
        this.setData({
          'component.checkboxes': items.map(item => {
            return {
              label: item.label,
              value: JSON.stringify(item.value || item)
            }
          })
        })
      }
    },
    groups: {
      type: Array,
      value: [],
      observer(groups) {
        this.setData({
          'component.groups': groups.map((group, groupi) => {
            return {
              maxnum: 0,
              id: `group-${groupi}`,
              ...group,
              items: group.items.map(item => {
                return {
                  label: item.label,
                  value: JSON.stringify(item.value || item)
                }
              }),
              $index: groupi,
            };
          })
        });
      }
    },
    maxnum: {
      type: Number,
      value: 0
    },
    selected: {
      type: Array,
      value: [],
      observer(selected) {
        this.setData({
          selected: selected.map(item => typeof item === 'string' ? item : JSON.stringify(item))
        });
      }
    }
  },
  data: {
    component: {
      opened: false,
      disabled: false,
      checkboxes: [],
      groups: [],
      selected: {}
    }
  },
  methods: {
    open() {
      this.setData({
        'component.opened': true
      })
    },
    close() {
      this.setData({
        'component.opened': false
      })
    },
    onGroupItemClick(e) {
      const selected = this.data.component.selected;
      const {
        group,
        value
      } = e.target.dataset;
      const setdata = {
        [`component.groups[${group.$index}].disabled`]: false
      };
      if (selected[value]) {
        delete selected[value];
      } else {
        if (this.data.maxnum === 1) {
          this.setData({ 'component.selected': [value] });
          return;
        }
        if (group.maxnum === 1) {
          Object.keys(selected).forEach(key => {
            if (selected[key] === group.id) {
              delete selected[key];
            }
          });
        }
        if (!this.data.component.disabled && !this.data.component.groups[group.$index].disabled) {
          selected[value] = group.id;
        }
        if (group.maxnum > 1 &&
          Object.keys(selected).filter(key => selected[key] === group.id).length >= group.maxnum) {
          setdata[`component.groups[${group.$index}].disabled`] = true;
        }
      }
      setdata['component.disabled'] = this.data.maxnum && Object.keys(selected).length >= this.data.maxnum;
      setdata['component.selected'] = selected;
      this.setData(setdata);
    },
    onCheckboxClick(e) {
      const selected = this.data.component.selected;
      const value = e.target.dataset.value;
      if (selected[value]) {
        delete selected[value];
      } else {
        if (this.data.maxnum === 1) {
          Object.keys(selected).forEach(key => {
            delete selected[key];
          });
        }
        if (!this.data.component.disabled) {
          selected[value] = true;
        }
      }
      this.setData({
        'component.disabled': this.data.maxnum > 1 && Object.keys(selected).length >= this.data.maxnum,
        'component.selected': selected
      });
    },
    ok() {
      this.close();
      this.triggerEvent('selected', Object.keys(this.data.component.selected).map(JSON.parse));
    }
  }
})