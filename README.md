# Lessert 網頁

這是一個 Lessert 的靜態商品網站，使用 HTML、CSS 與 JavaScript 製作，不需要前端框架。

## 頁面

- `index.html`：主頁，包含影片區域、slogan、商品列表與社群連結。
- `product.html`：商品頁，依照網址參數 `?id=1` 到 `?id=6` 切換商品。
- `product.js`：商品圖片、上下頁導覽與輪播邏輯。
- `styles.css`：全站版面與互動區域樣式。

## 本機預覽

```bash
npm run dev
```

開啟：

```text
http://localhost:8000
```

如果沒有使用 npm，也可以直接執行：

```bash
python3 -m http.server 8000
```

## 更新商品圖片

商品資料集中在 `product.js` 的 `products` 陣列。替換圖片時，維持目前資料夾與檔名，或同步更新 `media` 路徑即可。
