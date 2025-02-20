'use client';

import { deleteAccount } from '@/actions/auth';
import { Button } from './ui/button';

export default function DeleteAccount(props: { userId: string }) {
  return (
    <Button onClick={() => deleteAccount(props.userId)} variant="destructive">
      Delete Account
    </Button>
  );
}
