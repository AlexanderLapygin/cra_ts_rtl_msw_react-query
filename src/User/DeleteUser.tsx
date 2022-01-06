import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { api } from '../api/api';

async function deleteUser(userId: any) {
  try {
    return api(`/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // @ts-ignore
    throw new Error(`Error deleting User with Id ${userId}: `, error);
  }
}

export function DeleteUser({ userId, setSelectedUser }: any) {
  const [isDeleted, setIsDeleted] = useState(false);
  const queryClient = useQueryClient();
  const deleteUserMutation = useMutation(() => deleteUser(userId), {
    onSuccess: () => {
      setIsDeleted(true);
      setSelectedUser(null);
      queryClient.invalidateQueries('users');
    },
  });

  if (isDeleted) {
    return <div>User with Id {userId} successfully deleted!</div>;
  }

  return <button onClick={() => deleteUserMutation.mutate()}>Delete User</button>;
}
