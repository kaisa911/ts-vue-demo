/**
 *  2018/10/17  lize
 */
const glob = require('glob');

const fs = require('fs');

const path = require('path');

module.exports = {
  getPages: () => {
    const globPathHtml = [path.join(__dirname, '../src/**/index.html')]; // 入口模板正则
    const globPathJs = [path.join(__dirname, '../src/**/main.ts')]; // 入口脚本正则

    const splitArray = list => {
      let newAry = [];

      if (list.length > 0) {
        for (let entry of list) {
          entry = entry.substring(0, entry.lastIndexOf('/'));

          newAry.push(entry);
        }
      }

      return newAry;
    };

    const WriteFileFn = (src, path, writeContent) => {
      fs.exists(src, publicxists => {
        if (publicxists) {
          fs.writeFile(path, writeContent, 'utf8', error => {
            if (error) return console.log(error);
          });
        } else {
          fs.mkdir(src, err => {
            if (err) return console.error(err);

            fs.writeFile(path, writeContent, 'utf8', error => {
              if (error) return console.log(error);
            });
          });
        }
      });
    };

    const fileExist = filePath => {
      return fs.existsSync(filePath, exist => {
        return exist;
      });
    };

    const uniqueArr = (arr1, arr2) => {
      let arr3 = arr1.concat(arr2);

      let arr4 = [];

      for (let i = 0, len = arr3.length; i < len; i++) {
        if (arr4.indexOf(arr3[i]) === -1) {
          arr4.push(arr3[i]);
        }
      }

      return arr4;
    };

    let iSError = false;

    let pages = {};

    let PageDetal = '';

    let PageCount = {};

    let confDemo = {};

    let PageNameList = [];

    let CBIMPACKAGECONF = { AllPAGEAGE: false };

    // 截取路径
    let fileHtmlList = splitArray(glob.sync(...globPathHtml));

    let fileJsList = splitArray(glob.sync(...globPathJs));

    CBIMPACKAGECONF = fs.readFileSync(
      path.join(__dirname, '../src/cbim.package.conf.json'),
      'utf-8',
    )
      ? JSON.parse(
          fs.readFileSync(
            path.join(__dirname, '../src/cbim.package.conf.json'),
            'utf-8',
          ),
        )
      : CBIMPACKAGECONF;

    for (let entry of fileHtmlList) {
      if (fileJsList.indexOf(entry) >= 0) {
        let paths = entry + '/conf.json';

        let data = {
          title: entry.split('/')[entry.split('/').length - 1],

          filename: entry.split('/')[entry.split('/').length - 1],

          description: entry.split('/')[entry.split('/').length - 1],

          package: true,
        };
        if (fileExist(paths)) {
          data = JSON.parse(fs.readFileSync(paths, 'utf-8'));
        } else {
          fs.writeFile(paths, JSON.stringify(data), 'utf8', error => {
            if (error) return console.log(error);
          });
        }

        if (!CBIMPACKAGECONF.AllPAGEAGE || !CBIMPACKAGECONF) {
          if (data.package == undefined) {
            data.package = true;
          }

          if (
            (data.package || data.package == undefined) &&
            data.package != null
          ) {
            if (!PageNameList.includes(data.filename)) {
              PageNameList.push(data.filename);

              pages[data.filename] = {
                entry: `${entry}/main.ts`,

                template: `${entry}/index.html`,

                filename: `${data.filename}.html`,

                // title: `${data.title}`,
                title: process.env.VUE_APP_ENTERPRICE_CODE,
              };

              if (data.chunks && CBIMPACKAGECONF.chunks) {
                pages[data.filename].chunks = uniqueArr(
                  data.chunks,
                  CBIMPACKAGECONF.chunks,
                ).concat([data.filename]);
              } else {
                if (data.chunks) {
                  pages[data.filename].chunks = data.chunks.concat([
                    data.filename,
                  ]);
                } else if (CBIMPACKAGECONF.chunks) {
                  pages[data.filename].chunks = CBIMPACKAGECONF.chunks.concat([
                    data.filename,
                  ]);
                }
              }
              confDemo[data.filename] = `${data.filename}.html`;

              PageCount[entry.split('/')[entry.split('/').length - 1]] = data;

              PageDetal +=
                '#### ' +
                entry.split('/')[entry.split('/').length - 1] +
                '：' +
                data.title +
                '\n>`\n文件名：' +
                data.filename +
                '\n`\n\n>`\n文件描述：' +
                data.description +
                '\n`\n';
            } else {
              iSError = true;

              break;
            }
          }
        } else {
          if (!PageNameList.includes(data.filename)) {
            PageNameList.push(data.filename);

            pages[data.filename] = {
              entry: `${entry}/main.ts`,

              template: `${entry}/index.html`,

              filename: `${data.filename}.html`,

              title: `${data.title}`,
            };

            if (data.chunks && CBIMPACKAGECONF.chunks) {
              pages[data.filename].chunks = uniqueArr(
                data.chunks,
                CBIMPACKAGECONF.chunks,
              ).concat([data.filename]);
            } else {
              if (data.chunks) {
                pages[data.filename].chunks = data.chunks.concat([
                  data.filename,
                ]);
              } else if (CBIMPACKAGECONF.chunks) {
                pages[data.filename].chunks = CBIMPACKAGECONF.chunks.concat([
                  data.filename,
                ]);
              }
            }

            confDemo[data.filename] = `${data.filename}.html`;

            PageCount[entry.split('/')[entry.split('/').length - 1]] = data;

            PageDetal +=
              '#### ' +
              entry.split('/')[entry.split('/').length - 1] +
              '：' +
              data.title +
              '\n>`\n文件名：' +
              data.filename +
              '\n`\n\n>`\n文件描述：' +
              data.description +
              '\n`\n';
          } else {
            iSError = true;

            break;
          }
        }
      }
    }

    if (iSError) {
      throw new Error('The page name is not unique');
    } else {
      let stringConfdemo = JSON.stringify({
        code: 200,

        success: true,

        message: '',

        data: confDemo,
      });

      WriteFileFn('./public', './public/RouterInfo.conf.json', stringConfdemo);

      WriteFileFn('./src/pages', './src/pages/Page.description.md', PageDetal);

      console.log(pages, '这里是单页对象');

      console.log(confDemo, '这里是配置模板');

      return pages;
    }
  },
};
