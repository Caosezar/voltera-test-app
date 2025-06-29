import type { Load } from '@sveltejs/kit';
import type { AgifyResult } from '../lib/types';

/**
 * Função load universal do SvelteKit, observa a variável `url` para acessar a querystring.
 * @param url - Objeto URL da requisição, usado para acessar a querystring, que contem o valor do nome.
 * @param fetch - Função fetch nativa do SvelteKit, usada para fazer requisições HTTP.
 * @returns Objeto mapeado AgifyResult, com age, name, count e error
 */
export const load: Load = async ({ url, fetch }): Promise<AgifyResult> => {
	const name = url.searchParams.get('name')?.trim() || '';
	// Se não houver nome, retorna dados nulos e não envia requisição para a API.
	if (!name) return { age: null, name: '', count: null, error: null };

	try {
		// Consome a API
		const res = await fetch(`https://api.agify.io/?name=${encodeURIComponent(name)}`);
		if (!res.ok) throw new Error('Erro ao consultar a API');
		const data = await res.json();
		// Retorno da API mapeado
		return { age: data.age, name: data.name, count: data.count, error: null };
	} catch (e: unknown) {
		// Caso de erro
		return { age: null, name, count: null, error: 'Erro ao consultar a API' };
	}
};
