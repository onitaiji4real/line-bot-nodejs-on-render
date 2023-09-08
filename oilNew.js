const puppeteer = require("puppeteer");

async function getOil() {
  const browser = await puppeteer.launch({
    headless: "new",
    // headless: false,
  });

  const page = await browser.newPage();
  await page.goto("https://www.cpc.com.tw/");

  const [link] = await page.$x('//a[contains(text(), "更多新聞稿")]');
  await Promise.all([
    link.click(),
    page.waitForNavigation({ waitUntil: "networkidle0" }),
  ]);

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
  console.log(item);
  await browser.close();
  return item;
}
module.exports.getOil;
