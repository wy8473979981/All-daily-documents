import { Toast } from 'vant'
import _ from 'lodash';
let needLoadingRequestCount = 0;

function startLoading() {
  Toast.loading({
    message: "加载中...",
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  });
}

function endLoading() {
  Toast.clear()
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
    _.debounce(tryCloseLoading, 200)()
  }
}
