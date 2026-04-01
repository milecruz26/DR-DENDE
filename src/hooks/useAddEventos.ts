// src/hooks/useAddEventos.ts
// import { adicionarEventoMock, Evento } from '@/data/mocksEvents';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useCreateEvent } from './useStaff';

// Dica técnica: Quando você mudar para o Axios, lembre-se de configurar o useEffect na sua tela de listagem para buscar os dados (GET) sempre que a tela ganhar foco, usando o hook useFocusEffect do Expo, para garantir que o novo evento apareça lá sem precisar reiniciar o app.

export const useAdicionarEvento = () => {
  const router = useRouter();
  const { mutateAsync } = useCreateEvent();

  // Estados
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [horario, setHorario] = useState('');
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [cidade, setCidade] = useState('');
  const [showCityPicker, setShowCityPicker] = useState(false);

  // Lógica de Horário com Validação
  const handleHorarioChange = (text: string) => {
    let limpo = text.replace(/[^0-9]/g, '');
    if (limpo.length === 1 && parseInt(limpo) > 2) limpo = '2';
    if (limpo.length === 2 && limpo.startsWith('2') && parseInt(limpo[1]) > 3) limpo = '23';
    if (limpo.length === 3 && parseInt(limpo[2]) > 5) limpo = limpo.substring(0, 2) + '5';

    let formatado = limpo;
    if (limpo.length > 2) formatado = `${limpo.substring(0, 2)}:${limpo.substring(2, 4)}`;
    setHorario(formatado);
  };

  // Máscara de CEP (Bônus)
  const handleCepChange = (text: string) => {
    let limpo = text.replace(/\D/g, '');
    if (limpo.length > 8) limpo = limpo.substring(0, 8);
    let formatado = limpo;
    if (limpo.length > 5) formatado = `${limpo.substring(0, 5)}-${limpo.substring(5, 8)}`;
    setCep(formatado);
  };

  // Lógica de Salvar
  const handleSalvarEvento = async () => {
    if (
      !nome ||
      !dataSelecionada ||
      !horario ||
      horario.length < 5 ||
      !descricao ||
      !cep ||
      !rua ||
      !bairro ||
      !cidade
    ) {
      alert('Por favor, preencha todos os campos obrigatórios (*)');
      return;
    }

    try {
      // 🧠 1. Limpar cidade (remove " - BA")
      const cityOnly = cidade.split(' - ')[0];

      // 🧠 2. Converter data + hora
      const [horas, minutos] = horario.split(':').map(Number);
      const dataFinal = new Date(dataSelecionada);
      dataFinal.setHours(horas, minutos, 0, 0);

      // ⚠️ IMPORTANTE: backend espera "date"
      const formattedDate = dataFinal.toISOString().split('T')[0];

      // 🧠 3. Payload CORRETO
      const payload = {
        name: nome,
        event_date: formattedDate,
        description: descricao,
        address: {
          city: cityOnly,
          street: rua,
          neighborhood: bairro,
          zip_code: cep,
        },
      };

      console.log('📤 Payload enviado:', payload);

      // 🚀 4. Chamada real da API
      await mutateAsync(payload);

      alert('Evento cadastrado com sucesso!');

      router.back(); // volta pra lista

    } catch (error: any) {
      console.log('❌ ERRO BACKEND:', error.response?.data);
      alert('Erro ao salvar o evento');
    }
  };

  return {
    states: {
      nome, descricao, cep, rua, bairro, horario, dataSelecionada, showDatePicker, cidade,
      showCityPicker
    },
    actions: {
      setNome, setDescricao, setRua, setBairro,
      setShowDatePicker, setDataSelecionada,
      handleHorarioChange, handleCepChange, handleSalvarEvento, setCidade,
      setShowCityPicker,
    }
  };
};