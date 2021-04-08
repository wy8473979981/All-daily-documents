import { Loading } from 'element-ui';
import _ from 'lodash';
let needLoadingRequestCount = 0;
let loading;

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '',
    background: 'rgba(255, 255, 255, 0.1)'
  })
}

function endLoading() {
  loading.close()
}

const tryCloseLoading = () => {
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
};

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    _.debounce(tryCloseLoading, 300)()
  }
}