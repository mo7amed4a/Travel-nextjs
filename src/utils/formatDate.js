import moment from 'moment';

export function formatISODate(isoDateString, isShort = false) {
  if (!isoDateString) return '' 
    const formattedDate = moment(isoDateString);
    if (false) {
        moment.locale('ar', {
          months : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
          monthsShort : 'ينا._فبر._مارس_أبر._ماي._يونيو_يوليو_أغ._سبت._أكت._نوف._ديس.'.split('_'),
          monthsParseExact : true,
          weekdays : 'الأحد_الاثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
          weekdaysShort : 'أحد_إثن_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
          weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
          weekdaysParseExact : true,
          longDateFormat : {
              LT : 'HH:mm',
              LTS : 'HH:mm:ss',
              L : 'DD/MM/YYYY',
              LL : 'D MMMM YYYY',
              LLL : 'D MMMM YYYY HH:mm',
              LLLL : 'dddd D MMMM YYYY HH:mm'
          },
          calendar : {
              sameDay : '[اليوم على] LT',
              nextDay : '[غداً على] LT',
              nextWeek : 'dddd [على] LT',
              lastDay : '[أمس على] LT',
              lastWeek : 'dddd [الماضي على] LT',
              sameElse : 'L'
          },
          relativeTime : {
              future : 'في %s',
              past : 'منذ %s',
              s : 'ثواني قليلة',
              m : 'دقيقة واحدة',
              mm : '%d دقائق',
              h : 'ساعة واحدة',
              hh : '%d ساعات',
              d : 'يوم واحد',
              dd : '%d أيام',
              M : 'شهر واحد',
              MM : '%d أشهر',
              y : 'سنة واحدة',
              yy : '%d سنوات'
          },
          dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
          ordinal : function (number) {
              return number + (number === 1 ? 'er' : '');
          },
          meridiemParse : /ص|م/,
          isPM : function (input) {
              return input === 'م';
          },
          meridiem : function (hours, minutes, isLower) {
              return hours < 12 ? 'ص' : 'م';
          },
          week : {
              dow : 6, // السبت هو أول يوم في الأسبوع.
              doy : 12  // أول أسبوع يبدأ في هذا اليوم من السنة.
          }
      });
    }
    return formattedDate.fromNow()
  }

  export function formatDate(date) {
    return moment(date).format('DD/MM/YYYY');
  }