function checkHoraroSchedule() {
  const horaroUrl = "https://horaro.org/-/api/v1/schedules/xxxxxxxxxx"; // HoraroのAPI URL
  const response = UrlFetchApp.fetch(horaroUrl);
  const json = JSON.parse(response.getContentText());
  
  const now = Math.floor(new Date().getTime() / 1000); // 現在時刻（Unixタイムスタンプ）

  for (const item of json.data.items) {
    const startTime = item.scheduled_t; // 開始時間（Unix時間）
    const endTime = startTime + (item.length_t || 0) + (json.data.setup_t || 0);; // 終了時間（開始時間 + estimate + セットアップ時間）
    
    Logger.log(now);
    Logger.log(startTime);
    if (now >= startTime && now <= endTime) {
      let url = item.data[3]; // URL列のデータ（Horaroのカラムに応じて修正）
      Logger.log(url);
      if (url) {
        // MarkdownのURL形式から実際のURLを抽出
        const match = url.match(/\((https?:\/\/[^\)]+)\)/);
        if (match) {
          url = match[1]; // ()内のURLを取得
        }
        
        Logger.log("リダイレクト先: " + url);
        return url; // URLを返す（後でリダイレクト用のWebアプリで使用）
      }
    }
  }

  return null; // 該当なし
}
  
function doGet() {
  const url = checkHoraroSchedule();
  if (url) {
    return HtmlService.createHtmlOutput(`<html><body>
      <p>リダイレクト先: <a href="${url}" target="_blank">こちらをクリック</a></p>
      </body></html>`);
  }
  return HtmlService.createHtmlOutput("現在アクティブなURLはありません。");
}