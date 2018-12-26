const i18n = {
  status: {
    published: '已发布',
    pending: '未发布',
    draft: '草稿',
  }
};

const translate = (str, defaultRes) => {
  const propertyArr = str.split('.');
  let res = undefined;

  try {
    res = propertyArr.reduce((acc, item) => {return acc[item]; }, i18n);
  } catch(error) {
    // console.log('log: translation failed');
  }

  if(res === undefined) {
    if(defaultRes) return defaultRes;
    return 'translation failed';
  }
  return res;
};

console.log(translate('status.published'));
console.log(translate('status.default', '未知'));
console.log(translate('article.keyword'));
console.log(translate('article.keyword', '未知'));
