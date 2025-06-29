import type { Load } from '@sveltejs/kit';
import type { AgifyResult } from '../lib/types';

export const load: Load = async ({ url, fetch }): Promise<AgifyResult> => {
	const name = url.searchParams.get('name')?.trim() || '';
	if (!name) return { age: null, name: '', count: null, error: null };

	try {
		const res = await fetch(`https://api.agify.io/?name=${encodeURIComponent(name)}`);
		if (!res.ok) throw new Error('Erro ao consultar a API');
		const data = await res.json();
		return { age: data.age, name: data.name, count: data.count, error: null };
	} catch (e: unknown) {
		return { age: null, name, count: null, error: 'Erro ao consultar a API' };
	}
};
