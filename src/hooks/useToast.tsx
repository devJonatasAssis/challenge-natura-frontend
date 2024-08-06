import type { OptionsObject, VariantType } from 'notistack';
import { useSnackbar } from 'notistack';

export function useToast() {
  const { enqueueSnackbar } = useSnackbar();
  const toast = (msg: {
    title?: string;
    type?: VariantType;
    options?: OptionsObject;
  }) => {
    return enqueueSnackbar(msg.title, { variant: msg.type, ...msg.options });
  };
  return { toast };
}
