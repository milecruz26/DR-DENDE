import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { authService } from '@/services/auth';
import type { complaintService } from '@/services/complaint';
import type { dishService } from '@/services/dish';
import type { entryService } from '@/services/entry';
import type { establishmentService } from '@/services/establishment';
import type { eventService } from '@/services/event';
import type { staffService } from '@/services/staff';
import type { userService } from '@/services/user';

type ServiceMap = typeof authService &
  typeof complaintService &
  typeof dishService &
  typeof entryService &
  typeof establishmentService &
  typeof eventService &
  typeof staffService &
  typeof userService;

type ServiceKey = keyof ServiceMap;

export const useInvalidateQueries = () => {
  const queryClient = useQueryClient();

  const invalidate = useCallback(
    (key: ServiceKey, ...params: (string | number)[]) => {
      queryClient.invalidateQueries({ queryKey: [key, ...params] });
    },
    [queryClient],
  );

  return invalidate;
};
