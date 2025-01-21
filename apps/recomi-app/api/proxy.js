// /api/proxy.js
import http from "http";

export default async function handler(req, res) {
  const { method, url, headers, body } = req;

  // 目标 HTTP 服务的地址
  const targetUrl = "http://10.107.0.210:3300/api/v1/team/";

  // 创建一个 HTTP 请求
  const proxyReq = http.request(
    targetUrl + url,
    {
      method,
      headers,
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    },
  );

  // 处理请求数据
  if (body) {
    proxyReq.write(body);
  }

  proxyReq.on("error", (err) => {
    res.status(500).json({ error: "Proxy error", details: err.message });
  });

  proxyReq.end();
}
