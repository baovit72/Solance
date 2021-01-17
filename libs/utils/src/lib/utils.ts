import * as moment from 'moment';
import * as timezone from 'moment-timezone';
import { HttpParams } from '@angular/common/http';

export function toUTC(data: string | Date | moment.Moment): moment.Moment {
	return moment(data).utc();
}

export function toLocal(data: string | Date | moment.Moment): moment.Moment {
	return moment.utc(data).local();
}

// convert local time to another timezone
export function convertLocalToTimezone(
	localDt: string | Date,
	localDtFormat: string,
	timeZone: string,
	format = 'YYYY-MM-DD hh:mm:ss'
) {
	return timezone(localDt, localDtFormat).tz(timeZone).format(format);
}

export function getContrastColor(hex: string) {
	const threshold = 130;
	const hexToRGB = (h) => {
		const hexValue = h.charAt(0) === '#' ? h.substring(1, 7) : h;
		return {
			red: parseInt(hexValue.substring(0, 2), 16),
			blue: parseInt(hexValue.substring(2, 4), 16),
			green: parseInt(hexValue.substring(4, 6), 16)
		};
	};
	const { red, green, blue } = hexToRGB(hex);
	const cBrightness = (red * 299 + green * 587 + blue * 114) / 1000;

	return cBrightness > threshold ? '#000000' : '#ffffff';
}

// It will use when file uploading from angular, just pass object of with file it will convert it to from data
export function toFormData(obj: any, form?: any, namespace?: any) {
	const fd = form || new FormData();
	let formKey;
	for (const property in obj) {
		if (obj.hasOwnProperty(property) && obj[property]) {
			if (namespace) {
				formKey = namespace + '[' + property + ']';
			} else {
				formKey = property;
			}

			// if the property is an object, but not a File, use recursivity.
			if (obj[property] instanceof Date) {
				fd.append(formKey, obj[property].toISOString());
			} else if (
				typeof obj[property] === 'object' &&
				!(obj[property] instanceof File)
			) {
				toFormData(obj[property], fd, formKey);
			} else {
				// if it's a string or a File object
				fd.append(formKey, obj[property]);
			}
		}
	}
	return fd;
}

export function progressStatus(value) {
	if (value >= 75) {
		return 'success';
	} else if (value >= 50) {
		return 'warning';
	} else if (value >= 25) {
		return 'info';
	} else {
		return 'danger';
	}
}

// It will use for pass nested object or array in query params in get method.
export function toParams(query) {
	let params: HttpParams = new HttpParams();
	Object.keys(query).forEach((key) => {
		if (isJsObject(query[key])) {
			params = toSubParams(params, key, query[key]);
		} else {
			params = params.append(key.toString(), query[key]);
		}
	});
	return params;
}

function toSubParams(params: HttpParams, key: string, object: any) {
	Object.keys(object).forEach((childKey) => {
		if (isJsObject(object[childKey])) {
			params = toSubParams(
				params,
				`${key}[${childKey}]`,
				object[childKey]
			);
		} else {
			params = params.append(`${key}[${childKey}]`, object[childKey]);
		}
	});

	return params;
}

export function isJsObject(object: any) {
	return (
		object !== null && object !== undefined && typeof object === 'object'
	);
}

export function isEmpty(value: any) {
	if (value instanceof Array) {
		value = value.filter((val) => !isEmpty(val));
		return value.length === 0;
	} else if (value && typeof value === 'object') {
		return Object.keys(value).length === 0;
	} else {
		return (
			!value ||
			(value + '').toLocaleLowerCase() === 'null' ||
			(value + '').toLocaleLowerCase() === 'undefined'
		);
	}
}

/*
 * Get average value column in array object
 */
export function average(items: any, column: string) {
	let sum = 0;
	if (items.length > 0) {
		items.forEach((item) => {
			sum += parseFloat(item[column]);
		});
	}
	return sum / items.length;
}

/**
 * The precision for a decimal (exact numeric applies only for decimal column), which is the maximum
 * number of digits that are stored.
 */
export function convertPrecisionFloatDigit(val: number, digit: number = 6) {
	return parseFloat(parseFloat(val.toString()).toFixed(digit));
}

/*
 * Retrieve name from email address
 */
export function retrieveNameFromEmail(email: string): string {
	return ucFirst(email.substring(0, email.lastIndexOf('@')), true);
}

/*
 * Capitalize the first letter of a string being
 */
export function ucFirst(str: string, force: boolean): string {
	str = force ? str.toLowerCase() : str;
	return str.replace(/(\b)([a-zA-Z])/, function (firstLetter: string) {
		return firstLetter.toUpperCase();
	});
}
