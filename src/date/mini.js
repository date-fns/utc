export class UTCDateMini extends Date {
  constructor() {
    super();

    this.setTime(
      arguments.length === 0
        ? // Enables Sinon's fake timers that override the constructor
          Date.now()
        : arguments.length === 1
          ? typeof arguments[0] === "string"
            ? +new Date(arguments[0])
            : arguments[0]
          : Date.UTC(...arguments),
    );
  }

  getTimezoneOffset() {
    return 0;
  }

  getYear() {
    return super.getUTCFullYear() - 1900;
  }

  setYear(year) {
    // Defer conversion to preserve the native setter's receiver and coercion behavior.
    return super.setUTCFullYear({
      valueOf: () => {
        const integer = Math.trunc(+year);
        return integer >= 0 && integer <= 99 ? 1900 + integer : integer;
      },
    });
  }
}

// Replace getter and setter functions with UTC counterparts
const re = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((method) => {
  if (re.test(method)) {
    const utcMethod = Date.prototype[method.replace(re, "$1UTC")];
    if (utcMethod) UTCDateMini.prototype[method] = utcMethod;
  }
});
