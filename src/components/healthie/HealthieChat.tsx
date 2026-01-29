import { Chat } from '@healthie/chat';
import '@healthie/chat/dist/styles/index.css';

export function HealthieChat() {
  return (
    <div className="h-[500px] border rounded-lg overflow-hidden bg-background">
      <Chat />
    </div>
  );
}
