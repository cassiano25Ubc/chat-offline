import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
type conversation = {
  id: string;
   messages: ChatMessage[];
};
type ChatMessage = {
  text: string;
  mode: 'Você' | 'Robô';
};

type chatStore = {
  conversations: conversation[];
  selectedConversation: string | null;
  createConversation: () => void;
  selectConversation: (id: string) => void;
  addMessage: (text: string, mode: ChatMessage['mode']) => void;
  removeMessage: (index: number) => void;
  deleteConversation: (id: string) => void;
};

export const useChatStore = create<chatStore>()(
  persist(
    (set, get) => ({
    conversations: [],
    selectedConversation: null,
    selectConversation: (id: string) => {
        set({ selectedConversation: id });
    },
    addMessage: (text, mode) => {
    const { conversations, selectedConversation } = get();

    if (!selectedConversation) return;

    set({
        conversations: conversations.map((conversation) =>
            conversation.id === selectedConversation
                ? {
                    ...conversation,
                    messages: [...conversation.messages, { text, mode }],
                }
                : conversation
        ),
    });
},
    removeMessage: (index) => {
        const { conversations, selectedConversation } = get();

        if (!selectedConversation) return;

        set({
            conversations: conversations.map((conversation) =>
                conversation.id === selectedConversation
                    ? {
                        ...conversation,
                        messages: conversation.messages.filter((_, messageIndex) => messageIndex !== index),
                    }
                    : conversation
            ),
        });
    },
    createConversation: () => {
        const conversations = get().conversations;
        const nextNumber = conversations.reduce((max, conversation) => {
            const numericId = Number(conversation.id);
            return Number.isFinite(numericId) ? Math.max(max, numericId) : max;
        }, 0);
        const nextId = String(nextNumber + 1).padStart(3, '0');

        set({
            conversations: [
                ...conversations,
                 { id: nextId, messages:[] }
                ],
            selectedConversation: nextId,
        });
    },
    deleteConversation: (id) => {
        const { conversations, selectedConversation } = get();
        const remainingConversations = conversations.filter((conversation) => conversation.id !== id);

        set({
            conversations: remainingConversations,
            selectedConversation:
                selectedConversation === id
                    ? remainingConversations[0]?.id ?? null
                    : selectedConversation,
        });
    }
    }),
    {
    name: 'chat-offline-conversations',
    storage: createJSONStorage(() => localStorage),
    }
  )
);