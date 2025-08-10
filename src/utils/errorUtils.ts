// utils/errorUtils.ts
import axios from 'axios';

export function handleErrorMessage(error: unknown): string {
	if (axios.isAxiosError(error)) {
		// Erro do axios, tenta pegar a mensagem da resposta
		return error.response?.data?.message || error.message;
	}
	if (error instanceof Error) {
		return error.message;
	}
	return String(error);
}
