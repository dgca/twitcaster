import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const defaultErrorMessage =
  'Something went wrong. Please refresh the page and try again.';

export function useGet<T>(
  endpoint: string,
  init?: RequestInit,
  skip?: boolean
): {
  data: T | null;
  error: string | null;
  status: 'READY' | 'ERROR' | 'LOADING' | 'SKIPPED';
} {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    if (data || skip) {
      return;
    }

    const doFetch = async () => {
      try {
        const response = await fetch(endpoint, init);
        const data = await response.json();

        if (/^4|5/.test(response.status.toString())) {
          throw new Error(defaultErrorMessage);
        }

        setData(data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : defaultErrorMessage;
        setError(message);
        toast({
          title: 'Error',
          description: message,
          status: 'error',
          duration: null,
          isClosable: false,
        });
      }
    };

    doFetch();
  }, [data, toast, endpoint, init, skip]);

  return {
    data,
    error,
    status:
      (skip && 'SKIPPED') ||
      (!!data && 'READY') ||
      (!!error && 'ERROR') ||
      'LOADING',
  };
}
