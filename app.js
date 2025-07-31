const cameras = [
  { title: '渋谷スクランブル交差点 Live',lat: 35.659462, lon: 139.700587,videoId: 'BXCHvmt4zaU' },
 
  { title: '京都・四条大橋 Live',lat: 35.011636, lon: 135.767264,videoId: ''}
];


const map = L.map('map').setView([35.681, 139.767], 6);              // 東京中心
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {   // OSM 無料タイル
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);                                                       // 利用規約要確認 :contentReference[oaicite:2]{index=2}

/* ---------- マーカーをクラスタリング ---------- */
const cluster = L.markerClusterGroup();                              // 大量でも高速 :contentReference[oaicite:3]{index=3}
cameras.forEach(cam => {
  const marker = L.marker([cam.lat, cam.lon]);
  marker.bindPopup(buildPopup(cam));
  cluster.addLayer(marker);
});
map.addLayer(cluster);

/* ---------- ポップアップ内で YouTube 再生 ---------- */
function buildPopup({ title, videoId }) {
  // autoplay はミュート必須 / iOS は playsinline が必要 :contentReference[oaicite:4]{index=4}
  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1`;
  return `
    <strong>${title}</strong><br>
    <iframe width="320" height="180"
            src="${src}"
            allow="autoplay; encrypted-media"
            allowfullscreen></iframe>`;
}
