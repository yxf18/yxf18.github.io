// 在worker.js中监听消息
const set = new Set();

onconnect = function (e) {
  const port = e.ports[0];
  set.add(port);

  port.onmessage = function (e) {
    set.forEach(p => {
      p.postMessage(e.data)
    })
  };

  port.postMessage('worker.js done.');
};
