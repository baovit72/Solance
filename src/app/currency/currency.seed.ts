import { Connection } from 'typeorm';
import { ICurrency, DEFAULT_CURRENCIES } from '@gauzy/models';
import { Currency } from './currency.entity';

export const createCurrencies = async (
	connection: Connection
): Promise<ICurrency[]> => {
	return await new Promise<ICurrency[]>(async (resolve, reject) => {
		try {
			const currencies: ICurrency[] = [];
			const entries = DEFAULT_CURRENCIES;
			for (const key of Object.keys(entries)) {
				if (entries.hasOwnProperty(key)) {
					const currency: ICurrency = {
						isoCode: key,
						currency: entries[key]
					};
					currencies.push(currency);
				}
			}
			await insertCurrency(connection, currencies);
			resolve(currencies);
		} catch (err) {
			console.log('Error parsing currency:', err);
			reject(null);
			return;
		}
	});
};

const insertCurrency = async (
	connection: Connection,
	currencies: ICurrency[]
): Promise<void> => {
	await connection
		.createQueryBuilder()
		.insert()
		.into(Currency)
		.values(currencies)
		.execute();
};
