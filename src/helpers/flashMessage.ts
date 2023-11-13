
import { showMessage } from 'react-native-flash-message';

interface IFlashMessage {
  isError?: boolean;
  isSuccess?: boolean;
  message: string;
}

export const flashMessage = ({ isError, isSuccess, message }: IFlashMessage) => {
  if (isError) {
    showMessage({
      message,
      type: 'danger',
      titleStyle: { fontSize: 18 },
    });
  }
  if (isSuccess) {
    showMessage({
      message,
      type: 'success',
      titleStyle: { fontSize: 18 },
    });
  }
};
