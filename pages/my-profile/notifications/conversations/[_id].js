import { useRouter } from 'next/router';

function ConversationIdPage() {
  const router = useRouter();
  const { query } = router;
  const id = query._id;

  return <div>ConversationIdPage</div>;
}

export default ConversationIdPage;
