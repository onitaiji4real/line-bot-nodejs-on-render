//引用linebot SDK
var linebot = require("linebot");

//設定是哪個provider //廢物小幫手
var bot = linebot({
  channelId: "2000616120",
  channelSecret: "42b4850a04cb9de364130df7f578d4ae",
  channelAccessToken:
    "Zs9XeERsKgzfe1PyiOhCnpjzqqtzLfdbeyXaEf5k3Fum1D5e7VxKq2aJT7ZW4c6vbO5yEdgF3pKoHgVaEddUs0yFmPFFCKUBwEdsLaF6swv5KcZ9Z+yroqYnNz9ZEFKQ4Uff/iDgMrq29ldv4hUwkgdB04t89/1O/w1cDnyilFU=",
});

//當有人傳送訊息時
bot.on("message", function (event) {
  //event.message.text 是使用者傳給bot的訊息
  //使用event.reply(要回傳的訊息)方法可將訊息回傳給使用者

  var replyMsg = `Hello 你剛剛說的是:${event.message.text}`;

  // 透過event.reply(要回傳的訊息)方法將訊息回傳給使用者

  event
    .reply(replyMsg)
    .then(function (data) {
      //訊息成功回傳後的處理
    })
    .catch(function (error) {
      //訊息回傳失敗後的處理
    });
});

//bot 所監聽的webhook路徑與port
bot.listen("https://line-bot-od6j.onrender.com", 3000, function () {
  console.log("[廢物小幫手已準備就緒！2]");
});
