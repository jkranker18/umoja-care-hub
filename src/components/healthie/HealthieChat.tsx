import { ConversationList, Chat } from '@healthie/chat';
import '@healthie/chat/dist/styles/index.css';

export function HealthieChat() {
  return (
    <div className="flex h-[500px] border rounded-lg overflow-hidden bg-background">
      {/* Conversation List - sidebar */}
      <div className="w-1/3 border-r overflow-y-auto">
        <ConversationList />
      </div>
      
      {/* Chat Area - main content */}
      <div className="flex-1 flex flex-col">
        <Chat />
      </div>
    </div>
  );
}
