const ERROR_MESSAGE = {
  require: "Vui lòng điền vào trường này",
  regex: "Vui lòng điền giá trị đúng",
  minMax: (min, max) =>
    `Vui lòng điền giá trị có độ dài trong khoản ${min} - ${max}`,
  min: (min) => `Vui lòng điền giá trị có độ dài tối thiểu là ${min}`,
  confirm: "Giá trị chưa chính xác",
};

const REGEXP = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  website:
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
  facebook:
    /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/,
  phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
  date: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
};

export function validate(rules = {}, form = {}) {
  const errObj = {};

  for (const name in rules) {
    for (const rule of rules[name]) {
      if (typeof rule === "function") {
        const message = rule(form[name], form);
        if (message) {
          errObj[name] = message;
          break;
        }
      }
      if (rule?.require) {
        if (
          (typeof form[name] === "boolean" && !form[name]) ||
          (typeof form[name] !== "boolean" && !form?.[name]?.trim())
        ) {
          errObj[name] = rule.message || ERROR_MESSAGE.require;
          break;
        }
      }

      if (typeof form[name] !== "boolean" && form[name]?.trim()) {
        if (rule?.regex) {
          let regex = rule?.regex;

          if (regex in REGEXP) {
            regex = REGEXP[regex];
          } else if (!(regex instanceof RegExp)) {
            regex = new RegExp();
          }

          if (!regex.test(form[name]?.trim())) {
            errObj[name] = rule.message || ERROR_MESSAGE.regex;
            break;
          }
        }

        if (rule?.min && rule?.max) {
          if (form[name].length < rule.min || form[name].length > rule.max) {
            errObj[name] =
              rule.message || ERROR_MESSAGE.minMax(rule.min, rule.max);
            break;
          }
        }

        if (rule?.min) {
          if (form[name].length < rule.min) {
            errObj[name] = rule.message || ERROR_MESSAGE.min(rule.min);
            break;
          }
        }

        if (rule?.confirm) {
          if (form[rule.confirm]?.trim() !== form[name]) {
            errObj[name] = rule.message || ERROR_MESSAGE.confirm;
            break;
          }
        }
      }
    }
  }

  return errObj;
}

export const required = ({
  require = true,
  message = ERROR_MESSAGE.require,
} = {}) => ({
  require,
  message,
});

export const regex = (regex, message) => ({
  regex,
  message,
});

export const min = (min, message) => ({
  min,
  message,
});

export const minMax = (min, max, message) => ({
  min,
  max,
  message,
});

export const confirm = (confirm, message) => ({
  confirm,
  message,
});
