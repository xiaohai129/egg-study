export function formatDate(date: any, fmt: string) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  if (typeof date == 'string') {
    return date;
  }

  if (!fmt) fmt = 'yyyy-MM-dd hh:mm:ss';

  if (!date || date == null) return null;
  var week = '星期';
  switch (date.getDay()) {
    case 0:
      week += '天';
      break;
    case 1:
      week += '一';
      break;
    case 2:
      week += '二';
      break;
    case 3:
      week += '三';
      break;
    case 4:
      week += '四';
      break;
    case 5:
      week += '五';
      break;
    case 6:
      week += '六';
      break;
  }
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
    'w+': week
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
  }
  return fmt;
}