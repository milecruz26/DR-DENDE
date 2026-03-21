// src/utils/validators.ts

export const validarSenha = (senha: string): string | null => {
  if (senha.length < 8) return "A senha deve ter no mínimo 8 caracteres.";
  if (!/[A-Z]/.test(senha)) return "A senha deve ter pelo menos 1 letra maiúscula.";
  if (!/[a-z]/.test(senha)) return "A senha deve ter pelo menos 1 letra minúscula.";
  if (!/[0-9]/.test(senha)) return "A senha deve ter pelo menos 1 número.";
  if (!/[!@#$%^&*(),.?":{}<>]/.test(senha)) return "A senha deve ter pelo menos 1 caractere especial.";

  return null; // Retorna null se a senha for válida
};