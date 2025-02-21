function checkHoraroSchedule() {
    const horaroUrl = "https://horaro.org/-/api/v1/schedules/xxxxxxxxxx"; // HoraroのAPI URL
    const response = UrlFetchApp.fetch(horaroUrl);
    const json = JSON.parse(response.getContentText());
    
    const now = Math.floor(new Date().getTime() / 1000); // 現在時刻（Unix タイムスタンプ）
  
    for (const item of json.data.items) {
      const startTime = item.scheduled_t; // 開始時間（Unix時間）
      const endTime = startTime + (item.length_t || 0) + (json.data.setup_t || 0);; // 終了時間（開始時間 + estimate + セットアップ時間）
     
      if (now >= startTime && now <= endTime) {
        let url = item.data[3]; // URL 列のデータ（Horaro のカラムに応じて修正）
       
        if (url) {
          // Markdown の URL 形式から実際のURLを抽出
          // URL 列が Markdown でないときはこの処理は外す
          const match = url.match(/\((https?:\/\/[^\)]+)\)/);
          if (match) {
            url = match[1]; // ()内の URL を取得
          }
          
          Logger.log("リダイレクト先: " + url);
          return url;
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
