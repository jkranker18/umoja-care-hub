import { Chat } from '@healthie/chat';
import '@healthie/chat/dist/styles/index.css';

interface HealthieChatProps {
  conversationId?: string;
}

export function HealthieChat({ conversationId }: HealthieChatProps) {
  return (
    <div className="h-[500px] border rounded-lg overflow-hidden bg-background">
      <Chat conversationId={conversationId} />
    </div>
  );
}
