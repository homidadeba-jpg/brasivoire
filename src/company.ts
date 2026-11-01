// Briefing e informações publicadas em http://www.brasivoire.com.br/ (01/11/2026).
const phone = (import.meta.env.VITE_BRASIVOIRE_WHATSAPP ?? '5519991001577').trim();
export const company = {
  name: 'Brasivoire',
  location: 'Campinas, São Paulo',
  whatsapp: /^55\d{10,11}$/.test(phone) ? phone : '',
  authorWhatsapp: '5585999745534',
  instagram: 'https://www.instagram.com/brasivoire/',
  email: 'brasivoire@uol.com.br',
  address: 'Av. Dr. Alberto Sarmento, 577, Bonfim',
  secondaryPhone: '+5519992512607',
  founded: '2002',
};
export const insuranceServices = [
  { id: 'guindastes', label: 'Guindastes', text: 'Uma especialidade da Brasivoire para a sua operação.', icon: 'crane' },
  { id: 'automovel', label: 'Automóvel', text: 'Para o seu carro e os caminhos que você escolhe.', icon: 'car' },
  { id: 'residencial', label: 'Residencial', text: 'Um cuidado a mais com o lugar que você chama de lar.', icon: 'house' },
  { id: 'empresarial', label: 'Empresarial', text: 'Seu negócio também faz parte dos seus planos.', icon: 'buildings' },
  { id: 'vida', label: 'Vida', text: 'Proteção para você e para quem faz parte da sua vida.', icon: 'heart' },
  { id: 'equipamentos', label: 'Máquinas e equipamentos', text: 'Atenção ao patrimônio que movimenta o seu trabalho.', icon: 'gear' },
  { id: 'transporte', label: 'Transporte de cargas', text: 'Seguros para o transporte de cargas.', icon: 'truck' },
  { id: 'icamento', label: 'Içamento', text: 'Atenção às particularidades das operações de içamento.', icon: 'crane' },
  { id: 'responsabilidade-civil', label: 'Responsabilidade civil', text: 'Consulte as opções para a sua atividade.', icon: 'shield' },
  { id: 'frotas', label: 'Frotas', text: 'Seguros para os veículos da sua frota.', icon: 'car' },
  { id: 'vida-empresarial', label: 'Vida empresarial', text: 'Seguro de vida em grupo para empresas.', icon: 'heart' },
  { id: 'rc-profissional', label: 'Responsabilidade civil profissional', text: 'Consulte as opções para a sua profissão.', icon: 'shield' },
] as const;
export const partners = [
  'VGM Transportes', 'Sumaq Locações', 'Munckmaq Transportes',
  'Mapel Equipamentos', 'Gigantão Transporte', 'LW Locações',
  'TRP Transportes', 'Locan Locações', 'Mega Peso',
] as const;
export const consortiumServices = [
  { id: 'imovel', label: 'Imóveis' },
  { id: 'auto', label: 'Automóveis' },
] as const;
