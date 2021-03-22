import {
  projectPageMap
} from '../../datasource';

const app = getApp();
Component({
  properties: {
    projectId: {
      type: String,
      observer(newValue) {
        this.setData({
          'component.projectId': newValue
        })
      }
    },
    projectName: {
      type: String,
      observer(newValue) {
        this.setData({
          'component.projectName': newValue
        })
      }
    },
    opened: {
      type: Boolean,
      value: false,
      observer(newValue) {
        this.setData({
          'component.opened': newValue
        })
      }
    },
    items: {
      type: Array,
      value: [],
      observer(newValue) {
        this.setData({
          'component.items': newValue
        });
      }
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
      items: [],
      projectName: null,
      projectId: null,
      selected: {},
      selectedId: null
    }
  },
  methods: {
    close() {
      this.setData({
        'component.opened': false
      })
      this.triggerEvent('closed');
    },
    onItemClick(e) {
      const {
        value
      } = e.target.dataset;
      this.setData({
        'component.selected': value,
        'component.selectedId': value.budgetSheetId
      });
    },
    ok() {
      const {
        id,
        budgetSheetId: mapId
      } = this.data.component.selected;
      if (mapId) {
        const url = projectPageMap[mapId][1];
        this.close();
        app.page.go(url, {
          id,
          projectName: this.data.component.projectName,
          projectId: this.data.component.projectId
        });
      }
    }
  }
})