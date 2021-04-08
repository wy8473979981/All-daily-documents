module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "require": true,
        "process": true
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "no-debugger": 0,
        // "no-unused-vars": [2, {"vars": "all", "args": "none"}],//不能有声明后未被使用的变量或参数
        'vue/no-side-effects-in-computed-properties': 'off',
        "no-control-regex": 0

    }
};