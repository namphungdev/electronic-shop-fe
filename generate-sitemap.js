const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
const { resolve } = require('path');
const hostname = 'https://www.gach315.com'; // Thay thế bằng URL của bạn

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/san-pham/gach-op-lat', changefreq: 'monthly', priority: 0.9 },
  { url: '/san-pham/thiet-bi-ve-sinh', changefreq: 'monthly', priority: 0.9 },
  { url: '/san-pham/tam-op-nhua', changefreq: 'monthly', priority: 0.9 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.8 },
];

(async () => {
  const stream = new SitemapStream({ hostname });
  const sitemapPath = resolve('./public/sitemap.xml');
  const writeStream = fs.createWriteStream(sitemapPath);
  stream.pipe(writeStream);
  links.forEach(link => stream.write(link));
  stream.end();

  await streamToPromise(stream).then(data =>
    fs.writeFileSync(sitemapPath, data.toString())
  );

  console.log('Sitemap đã được tạo thành công!');
})();
