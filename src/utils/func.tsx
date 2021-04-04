import moment from 'moment';
// import md5 from "md5";
import {
  NOT_UPDATE,
  FEMALE,
  MALE,
  YES,
  NO,
  MORNING,
  AFTERNOON,
  ALL_DAY,
  COOKIE_VIETINBANK,
  CHOOSE_GENDER,
  CHOOSE_YEAR,
  IN_PROCESSING,
} from './constants';
import * as queryString from 'query-string';
import isMobilePhone from 'validator/es/lib/isMobilePhone';
export const getMedicalBillStatus = (code, bookingDate) => {
  switch (code) {
    case -1:
      return 'Hủy thanh toán';
    case -2:
      return 'Hủy không khám';
    case -3:
      return 'Quá ngày khám';
    case 0:
      return 'Chưa thanh toán';
    case 1:
      if (moment().diff(bookingDate, 'day') > 0) {
        return 'Quá ngày khám';
      }
      return 'Chưa khám';
    case 2:
      return 'Đã khám';
    default:
      return IN_PROCESSING;
  }
};

export const getTimeToCancelBookingByHospitalId = (hospitalId) => {
  switch (hospitalId) {
    case 2:
      return '16:30';
    case 3:
      return '15:30';
    case 4:
      return '15:30';
    case 5:
      return '15:00';
    case 6:
      return '16:30';
    case 7:
      return '16:30';
    default:
      return '15:00';
  }
};

export const convertVietnameseStyleFor = (dayString) => {
  const momentDay = moment(dayString);
  return momentDay.format('DD-MM-YYYY');
};

export const getGender = (code) => {
  switch (code) {
    case 0:
      return FEMALE;
    case 1:
      return MALE;
    default:
      return NOT_UPDATE;
  }
};

export const getGenders = () => {
  const placeHolder = { id: -1, name: CHOOSE_GENDER };
  const m = { id: 1, name: MALE };
  const f = { id: 0, name: FEMALE };
  const data = [placeHolder, m, f];
  return data;
};

export const getBirthYears = () => {
  const placeHolder = { id: 0, name: CHOOSE_YEAR };
  const birthYears = [placeHolder];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= 1900; i--) {
    const id = i;
    const name = i;
    const data = { id, name };
    birthYears.push(data);
  }
  return birthYears;
};

export const formatAmount = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const checkBHYT = (code) => {
  switch (code) {
    case 0:
      return NO;
    case 1:
      return YES;
    default:
      return NOT_UPDATE;
  }
};

export const getWorkingPeriod = (code) => {
  switch (code) {
    case 1:
      return MORNING;
    case 2:
      return AFTERNOON;
    case 3:
      return ALL_DAY;
    default:
      return '';
  }
};

export const setIsCookieVietinBank = () =>
  window.localStorage.setItem(COOKIE_VIETINBANK, true);
export const isCookieVietinBank = () =>
  window.localStorage.getItem(COOKIE_VIETINBANK) || false;

export const getFeesHistoryItemStatus = (code) => {
  switch (code) {
    case 0:
      return 'Chưa thanh toán';
    case 1:
      return 'Đã thanh toán';
    default:
      return NOT_UPDATE;
  }
};

export const validatePhoneNumber = (number) => {
  try {
    return isMobilePhone(number, ['vi-VN']);
  } catch (e) {}
  return false;
};

export const copyToClipboard = (str) => {
  window.Clipboard.copy(str);
};

export const formatDate = (date) => {
  return date.slice(8) + date.slice(4, 8) + date.slice(0, 4);
};

// export const hash = phone => {
//   if (phone.startsWith("+84")) {
//     return md5(phone);
//   }
//   if (phone.startsWith("0")) {
//     return md5("+84" + phone.slice(1, phone.length));
//   }
//   return md5("+84" + phone);
// };

export const getDurationFromNowTo = (time = '') => {
  if (moment.duration(moment().diff(moment(time))).as('months') >= 1) {
    return ' ' + moment(time).format('[ngày] DD [tháng] MM, YYYY');
  }
  for (const unit of [
    ['weeks', 'tuần'],
    ['days', 'ngày'],
    ['hours', 'giờ'],
    ['minutes', 'phút'],
    ['seconds', 'giây'],
  ]) {
    const duration = moment.duration(moment().diff(moment(time))).as(unit[0]);
    if (duration >= 1) {
      return ` ${Math.floor(duration).toString()} ${unit[1]} trước`;
    }
  }
  return ' 1 giây trước';
};

export const convertNotiTitleIntoNotiType = (title = '') => {
  if (
    title.toLowerCase().includes('đăng ký') &&
    title.toLowerCase().includes('thành công')
  ) {
    return 'Đặt khám thành công';
  }

  if (title.toLowerCase().includes('hủy thành công')) {
    return 'Hủy phiếu thành công';
  }
  if (
    title.toLowerCase().includes('thanh toán') &&
    title.toLowerCase().includes('thành công')
  ) {
    return 'Thanh toán thành công';
  }
};

export const createQueryString = (baseUrl, params) => {
  return queryString.stringifyUrl({
    url: baseUrl,
    query: params,
  });
};

export const getStepFollowTreeMap = (subtype) => {
  switch (subtype) {
    case 'subject':
      return '/chon-chuyen-khoa';
    case 'service':
      return '/chon-dich-vu';
    default:
      return '/chon-lich-kham';
  }
};

export const checkNodeInBookingTree = (path) => {
  const isHasSubject = path.includes('subject');
  const isHasService = path.includes('service');
  const isHasDoctor = path.includes('doctor');
  const isHasRoom = path.includes('room');
  return { isHasSubject, isHasService, isHasDoctor, isHasRoom };
};
export const removeAscent = (str) => {
  if (str === null || str === undefined) {
    return str;
  }
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  return str;
};
export const getPartnerIdFromDomain = () => {
  const fullDomain = window.location.hostname;
  const parts = fullDomain.split('.');
  const subdomain = parts[0] !== 'www' ? parts[0] : parts[1];

  let partnerId = '';

  if (subdomain === 'medpro' || subdomain === 'testing') {
    partnerId = 'medpro';
  } else if (subdomain === 'localhost') {
    partnerId = 'medpro'; // chỗ này tách ra để test domain ở local
  } else {
    const index = subdomain.lastIndexOf('-');
    if (index === -1) {
      partnerId = subdomain;
    } else {
      partnerId = subdomain.slice(0, index);
    }
  }
  return partnerId;
};
