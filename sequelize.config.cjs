(async () => {
    const config = await import("./dist/config.js"); // 동적 import 사용
    module.exports = config.default; // ES 모듈의 default export 사용
})();
