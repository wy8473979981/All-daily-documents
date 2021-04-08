<template>
  <div class="svg-logo">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg">
        <g class="t0">
          <path d="M72.737 23.351c2.31-4.66 7.436-7.903 13.407-7.903 5.964 0 10.644 3.244 12.955 7.903h1.117c-1.766-5.612-7.362-9.73-14.072-9.73-6.716 0-12.378 4.118-14.144 9.73h.737z"/>
          <path d="M57.348 23.351c3.578-6.99 11.746-11.856 20.976-11.856 9.23 0 17.172 4.866 20.747 11.856h1.145c-2.738-8.424-11.5-14.594-21.892-14.594-10.394 0-19.157 6.17-21.892 14.594h.916z"/>
          <path d="M57.455 23.351c4.218-11.185 13.9-20.198 24.787-20.198 10.883 0 20.461 9.013 24.677 20.198H108a45.707 45.707 0 00-2.146-6.013C101.294 6.906 92.595 0 82.242 0 69.984 0 59.66 9.868 56.432 23.351h1.023z"/>
          <path d="M86.724 1.95S101.577 1.197 108 23.351h-1.807c-3.35-10.256-10.809-17.39-19.477-17.39-8.668 0-16.122 7.134-19.48 17.39h-1.074C68.734 10.991 76.96 1.946 86.716 1.946l.008.004z"/>
        </g>
        <g class="t1">
          <path d="M9.857 14.242l4.492.604c-.036 1.391-.457 2.527-1.25 3.382-.828.89-1.89 1.343-3.16 1.343-3.321 0-4.937-2.676-4.937-8.18 0-2.593.475-4.532 1.41-5.764.936-1.231 2.11-1.83 3.591-1.83 2.04 0 3.38.985 4.1 3.01l.072.205 3.763-1.135-.078-.23a8.783 8.783 0 00-2.397-3.644C14.013.673 12.144 0 9.908 0 6.913 0 4.161 1.15 2.492 3.419.84 5.667 0 8.449 0 11.684c0 3.056.75 5.787 2.229 8.113 1.498 2.358 4.184 3.554 7.217 3.554 2.57 0 4.531-1.028 5.839-3.059l1.086 2.717h2.115V11.192h-8.63v3.05zM27.199 0h-4.82v23.351h13.83l.764-4.211h-9.774zm27.314 2.094C53.236.704 51.263 0 48.649 0h-8.757v23.351h4.693v-9.065H49.1c2.108 0 3.874-.675 5.25-2.007 1.382-1.337 2.083-3.105 2.083-5.253 0-1.887-.646-3.546-1.92-4.932zm-9.928 1.801h3.358c1.48 0 2.508.313 3.054.93.56.63.833 1.367.833 2.251 0 .978-.293 1.74-.893 2.324-.596.58-1.484.874-2.641.874h-3.71V3.895z"/>
        </g>
      </svg>
      <p class="logo-txt">客户管理系统</p>
    </div>
  </div>
</template>

<style lang="scss">
.svg-logo{
  background:#515050;
  border-bottom:1px solid #666;
  height:112px;
  display:flex;
  justify-content:center;
  align-items:center;
  position: relative;
  svg{
    width: 108px;
    height: 24px;
    color: white;
    margin-bottom:5px;
    transition:.3s all ease-in-out;
    transform-origin:center center;
  }
  g{
    fill: currentColor;
    transition:.3s all ease-in-out;
    transform-origin:center center;
  }
}
.hideSidebar .svg-logo{
  svg{
    width:64px;
    margin-left:5px;
  }
  .t1{
    transform:scale(.8);
  }
  .t0{
    opacity: 0;
  }
}
.logo-txt{
  font-size:18px;
  font-weight:bold;
  color:#fff;
  margin:0;
  padding:0;
  letter-spacing:4px;
  width:110px;
  height:20px;
  white-space: nowrap;
  transition:.3s all ease-in-out;
  transform-origin:center center;
}
.hideSidebar .logo-txt{
  opacity:0;
  width:0;
  height:0;
}
</style>
