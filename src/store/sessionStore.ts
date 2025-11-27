'use client';

import {create} from 'zustand';
import {
  UserSession,
  ProductConfig,
  OutputDocument,
  ConversationMessage,
  Step,
  Language,
  Mode,
  ProductType
} from '@/lib/types';
import {nextStep} from '@/lib/stateMachine';
import {
  parseLanguageFromInput,
  parseProductTypeFromInput,
  parseModeFromInput,
  isBuildNow
} from '@/lib/parsers';

interface SessionStoreState {
  step: Step;
  session: UserSession | null;
  productConfig: ProductConfig;
  output: OutputDocument | null;
  messages: ConversationMessage[];
  languageGuess: Language | null;
  quickModePreferred: boolean;
}

interface SessionStoreActions {
  addMessage: (msg: Omit<ConversationMessage, 'id' | 'timestamp'>) => void;
  handleUserInput: (raw: string) => void;
  setOutput: (doc: OutputDocument) => void;
  editSection: (key: keyof OutputDocument['sections'], value: string | null) => void;
}

type SessionStore = SessionStoreState & SessionStoreActions;

const initialProductConfig: ProductConfig = {
  productType: null,
  riders: []
};

export const useSessionStore = create<SessionStore>((set, get) => ({
  step: 'language',
  session: null,
  productConfig: initialProductConfig,
  output: null,
  messages: [],
  languageGuess: null,
  quickModePreferred: false,

  addMessage: msg => {
    const now = new Date().toISOString();
    set(state => ({
      messages: [
        ...state.messages,
        {
          ...msg,
          id: `msg_${state.messages.length + 1}`,
          timestamp: now,
          meta: {
            step: state.step
          }
        }
      ]
    }));
  },

  handleUserInput: raw => {
    const state = get();
    const now = new Date().toISOString();

    const userMsg: ConversationMessage = {
      id: `msg_${state.messages.length + 1}`,
      role: 'user',
      content: raw,
      timestamp: now,
      meta: {step: state.step}
    };

    // Initialize local copies of state fields that may be updated
    let next = state.step;
    let session = state.session;
    const productConfig = { ...state.productConfig };
    let languageGuess = state.languageGuess;
    let quickModePreferred = state.quickModePreferred;

    if (state.step === 'language') {
      const lang = parseLanguageFromInput(raw);
      if (lang) {
        languageGuess = lang;
        session = {
          id: `sess_${Date.now()}`,
          language: lang,
          mode: 'guided',
          audience: 'agent',
          tone: 'plain',
          createdAt: now,
          updatedAt: now
        };
        next = nextStep('language');
      }
    } else if (state.step === 'productType') {
      const productType = parseProductTypeFromInput(raw);
      if (productType) {
        productConfig.productType = productType;
        next = nextStep('productType');
      }
      const mode = parseModeFromInput(raw);
      if (mode) {
        quickModePreferred = mode === 'quick';
      }
    } else if (state.step === 'guidedQuestions') {
      if (state.session && isBuildNow(raw, state.session.language)) {
        next = 'build';
      }
    } else if (state.step === 'summary') {
      if (state.session && isBuildNow(raw, state.session.language)) {
        next = 'build';
      }
    } else if (state.step === 'postBuildEdit') {
      // Post build edits handled by dedicated UI actions
    }

    set({
      messages: [...state.messages, userMsg],
      step: next,
      session,
      productConfig,
      languageGuess,
      quickModePreferred
    });
  },

  setOutput: doc => {
    set({ output: doc });
  },

  editSection: (key, value) => {
    set(state => {
      if (!state.output) return state;
      return {
        ...state,
        output: {
          ...state.output,
          sections: {
            ...state.output.sections,
            [key]: value
          },
          updatedAt: new Date().toISOString()
        } as OutputDocument
      };
    });
  }
}));