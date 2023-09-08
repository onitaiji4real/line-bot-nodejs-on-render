const puppeteer = require("puppeteer-core");

async function getOilCaptions() {
  // 提供Microsoft Edge的執行檔路徑
  const browser = await puppeteer.launch({
    headless: true,
    executablePath:
      "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", // 確保這是正確的路徑
  });

  const page = await browser.newPage();

  // 連線到目標網址
  await page.goto("https://www.cpc.com.tw/Default.aspx");

  // 點擊新聞稿連結
  //   await page.click('a:contains("更多新聞稿")');
  const [link] = await page.$x('//a[contains(text(), "更多新聞稿")]');
  if (link) {
    await link.click();
    //console.log("已點擊");
  }

  await page.waitForTimeout(5000); // 等待網頁載入完成

  //console.log("點擊新聞稿\n以下是新聞稿標題\n");

  // 撈取標題
  const keyword = "平穩雙機制";
  const newsCaptions = await page.$$(".caption");

  let item = [];
  let count = 0;
  for (let newsCaption of newsCaptions) {
    const text = await newsCaption.evaluate((el) => el.textContent);
    if (text.includes(keyword)) {
      //console.log(text + "\n");
      item.push(text);
      count++;
      if (count === 3) break;
    }
  }

  await browser.close();
  return item;
}

// async function runOilParser() {
//   try {
//     await getOilCaptions();
//     console.log("getOilCaptions 完成。");
//   } catch (error) {
//     console.log("getOilCaptions 失敗");
//   }
// }

async function runOilParser() {
  try {
    const result = await getOilCaptions();
    console.log("getOilCaptions 完成。");
    return result; // 返回 getOilCaptions 函数的结果
  } catch (error) {
    console.log("getOilCaptions 失敗");
    throw error;
  }
}

(async () => {
  try {
    const a = await runOilParser();
    console.log(a); // 打印结果
  } catch (error) {
    console.error("runOilParser 發生錯誤", error);
  }
})();

module.exports = runOilParser;
