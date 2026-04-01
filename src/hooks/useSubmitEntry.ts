import { useEntry } from '@/context/EntryContext';
import { useRouter } from 'expo-router';
import { useCreateEntry } from './useStaff';

export const useSubmitEntry = () => {
  const { data, reset } = useEntry();
  const router = useRouter();

  const mutation = useCreateEntry();

  const submit = () => {
    const payload = {
      ...data,
      picture: data.picture || 'placeholder.jpg',
      audio: data.audio || 'placeholder.mp3',
      ingredients: data.ingredients || [],
    };

    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(([, value]) => value !== undefined)
    ) as unknown as Parameters<typeof mutation.mutate>[0];

    console.log('📦 Payload enviado para /staff/entry:');
    console.log(JSON.stringify(payload, null, 2));
    mutation.mutate(filteredPayload, {
      onSuccess: () => {
        reset();
        router.navigate('/configuracoes');
      },
      onError: (err) => {
        console.log('Erro ao criar entry:', err);
      },
    });
  };

  return {
    submit,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};