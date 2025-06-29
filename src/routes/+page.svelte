<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { AgifyResult } from '$lib/types';

	export let data: AgifyResult;

	let inputName: string = data.name || '';
	let debounceTimeout: ReturnType<typeof setTimeout>;

	function onInput(e: Event) {
		const value = (e.target as HTMLInputElement).value.trim();
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(() => {
			const params = new URLSearchParams(window.location.search);
			if (value) {
				params.set('name', value);
			} else {
				params.delete('name');
			}
			goto(`/?${params.toString()}`, { replaceState: true });
		}, 700);
	}

	page.subscribe(($page) => {
		const urlName = $page.url.searchParams.get('name') || '';
		if (urlName !== inputName) {
			inputName = urlName;
		}
	});
</script>

<link rel="stylesheet" href="/src/lib/style.css" />

<main>
	<h1>Bem-vindo à Voltera</h1>
	<label for="name-input">Digite um nome:</label>
	<input
		id="name-input"
		type="text"
		bind:value={inputName}
		placeholder="Ex: Maria"
		autocomplete="off"
		on:input={onInput}
	/>
	{#if inputName}
		{#if data.error}
			<p class="error">{data.error}</p>
		{:else if data.age !== null}
			<div class="result-box">
				Nome: {data.name} <br />
				Idade estimada: {data.age} anos <br />
				Baseado em {data.count} registros.
			</div>
		{:else}
			<p class="pre-input">Consultando...</p>
		{/if}
	{/if}
    <a
        class="whats-app-cta"
        href="https://api.whatsapp.com/send/?phone=5585981433854&text=Ol%C3%A1%20Caio%2C%20seu%20teste%20foi%20visualizado.&type=phone_number&app_absent=0"
        target="_blank"
        aria-label="Abrir conversa no WhatsApp"
    >
        <img width="48" height="48" src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="whatsapp--v1"/>
    </a>
</main>
