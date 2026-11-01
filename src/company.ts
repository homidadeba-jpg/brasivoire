// Conteúdo confirmado no briefing. Atualizar aqui após receber os materiais oficiais.
const phone = (import.meta.env.VITE_BRASIVOIRE_WHATSAPP ?? '5519991001577').trim();
export const company = {
  name: 'Brasivoire',
  location: 'Campinas, São Paulo',
  whatsapp: /^55\d{10,11}$/.test(phone) ? phone : '',
  authorWhatsapp: '5585999745534',
  instagram: 'https://www.instagram.com/brasivoire/',
};
export const insuranceServices = [
  { id: 'automovel', label: 'Automóvel', text: 'Para o seu carro e os caminhos que você escolhe.', icon: 'car' },
  { id: 'residencial', label: 'Residencial', text: 'Um cuidado a mais com o lugar que você chama de lar.', icon: 'house' },
  { id: 'empresarial', label: 'Empresarial', text: 'Seu negócio também faz parte dos seus planos.', icon: 'buildings' },
  { id: 'vida', label: 'Vida', text: 'Proteção para você e para quem faz parte da sua vida.', icon: 'heart' },
  { id: 'equipamentos', label: 'Máquinas e equipamentos', text: 'Atenção ao patrimônio que movimenta o seu trabalho.', icon: 'gear' },
  { id: 'guindastes', label: 'Guindastes', text: 'Uma especialidade da Brasivoire para a sua operação.', icon: 'crane' },
] as const;
export const consortiumServices = [
  { id: 'imovel', label: 'Imóveis' },
  { id: 'auto', label: 'Automóveis' },
] as const;
