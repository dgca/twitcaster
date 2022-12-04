import { FormValues } from '../../../components/SettingsForm/SettingsForm';

import { useCallback, useState } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';

export function useSaveSettings() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const accessToken = useReadLocalStorage<string>('accessToken') ?? '';

  const submit = useCallback(
    async ({
      userId,
      fname,
      withFcastMeLink,
      onSuccess,
      onError,
    }: FormValues & {
      userId: string;
      onSuccess: () => void;
      onError: (error: { message: string }) => void;
    }) => {
      setIsSubmitting(true);

      try {
        const response = await fetch('/api/save-settings', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            userId,
            fname,
            withFcastMeLink,
          }),
        });

        const data = await response.json();

        if (/^4|5/.test(response.status.toString())) {
          throw new Error(
            data.error ?? 'Something went wrong, please try again.'
          );
        }

        onSuccess();
      } catch (err) {
        console.log(err);
        const message =
          err instanceof Error
            ? err.message
            : 'Something went wrong. Please try again.';
        onError({ message });
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  return {
    isSubmitting,
    submit,
  };
}
