import { StyleSheet, Text, View } from 'react-native';
import { SecondaryButton } from '@/components/Buttons/SecondaryButton';

interface VerbetesExcludConfirmProps {
  id?: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function VerbetesExcludConfirm({ ...props }: VerbetesExcludConfirmProps) {
  return (
    <View style={styles.modalContent}>
      {/* Corpo do Modal */}
      <View>
        <Text style={styles.modalWarningTitle}>Você tem certeza que deseja excluir?</Text>
        <Text style={styles.modalWarningText}>
          Ao excluir o verbete você não poderá recuperar o prato adicionado
        </Text>
      </View>

      {/* Botões */}
      <View style={styles.modalButtonsContainer}>
        <SecondaryButton
          title="Cancelar"
          onPress={props.onCancel}
          // size="small"
        />

        <SecondaryButton
          title="Excluir verbete"
          onPress={props.onConfirm}
          // size="small"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    width: '100%',
    // padding: 24,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalHeaderIcon: {
    padding: 8,
  },
  iconText: {
    fontSize: 20,
    color: '#555',
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  modalWarningTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A31919', // Vermelho do título
    marginBottom: 12,
  },
  modalWarningText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    marginBottom: 32,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBtnCancel: {
    borderColor: '#365D3D', // Verde do seu botão
    backgroundColor: 'transparent',
  },
  modalBtnCancelText: {
    color: '#365D3D',
    fontSize: 14,
    fontWeight: '600',
  },
  modalBtnDelete: {
    borderColor: '#A31919', // Vermelho do seu botão
    backgroundColor: 'transparent',
  },
  modalBtnDeleteText: {
    color: '#A31919',
    fontSize: 14,
    fontWeight: '600',
  },
});
