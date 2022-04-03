export const C_TYPE = {
  isString: function(value) {
    return typeof value === 'string';
  },

   isFunction : function (value) {
    return typeof value === 'function';
  },

   isNumber : function (value) {
    return typeof value === 'number';
  },

	isNumberedString : function (value) {
		return !isNaN(parseFloat(value));
	},

   isUndefined : function (value) {
    return typeof value === 'undefined';
  },

   isObject : function (value) {
    return typeof value === 'object';
  },

   isNotFalse : function (value) {
    return value !== false;
  },
}

