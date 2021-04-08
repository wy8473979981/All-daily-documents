import ImageViewer from './imageViewer';

/* istanbul ignore next */
ImageViewer.install = function(Vue) {
  Vue.component(ImageViewer.name, ImageViewer);
};

export default ImageViewer;
