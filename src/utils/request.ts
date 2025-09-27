import type { User, Message, LoginResponse } from '@/types';

// --- Mock Database ---
const USERS_STORAGE_KEY = '__users__';
const MESSAGES_STORAGE_KEY = '__messages__';

// Helper to get data from localStorage
function getFromStorage<T>(key: string, defaultValue: T): T {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    try {
      return JSON.parse(storedValue) as T;
    } catch (e) {
      console.error(`Error parsing localStorage key "${key}":`, e);
      return defaultValue;
    }
  }
  return defaultValue;
}

// Helper to set data to localStorage
function setToStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Initialize mock data
let users: User[] = getFromStorage<User[]>(USERS_STORAGE_KEY, []);
let messages: Message[] = getFromStorage<Message[]>(MESSAGES_STORAGE_KEY, []);

if (users.length === 0 && messages.length === 0) {
  // Add some initial data if storage is empty
  const user1: User = { id: 1, username: 'Alice' };
  const user2: User = { id: 2, username: 'Bob' };

  users = [user1, user2];
  messages = [
    { id: 1, content: 'Hello everyone!', author: user1, time: new Date().toISOString() },
    { id: 2, content: 'Vue 3 is awesome!', author: user2, time: new Date().toISOString() },
    { id: 3, content: 'Tailwind makes styling so much faster.', author: user1, time: new Date().toISOString() },
  ];

  setToStorage(USERS_STORAGE_KEY, users);
  setToStorage(MESSAGES_STORAGE_KEY, messages);
}


// --- API Functions ---

// Simulate network delay
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Registers a new user.
 */
export async function register(username: string): Promise<User> {
  await simulateDelay(500);
  if (users.some(u => u.username === username)) {
    throw new Error('Username already exists.');
  }
  const newUser: User = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    username,
  };
  users.push(newUser);
  setToStorage(USERS_STORAGE_KEY, users);
  return newUser;
}

/**
 * Logs in a user.
 */
export async function login(username: string): Promise<LoginResponse> {
  await simulateDelay(500);
  const user = users.find(u => u.username === username);
  if (!user) {
    throw new Error('Invalid username.');
  }
  // In a real app, you'd handle passwords and generate a real JWT.
  const token = `fake-token-for-${user.username}`;
  return { user, token };
}

/**
 * Fetches all messages.
 */
export async function fetchMessages(): Promise<Message[]> {
  await simulateDelay(300);
  return [...messages].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
}

/**
 * Posts a new message.
 */
export async function postMessage(content: string, authorId: number): Promise<Message> {
  await simulateDelay(400);
  const author = users.find(u => u.id === authorId);
  if (!author) {
    throw new Error('Author not found.');
  }
  const newMessage: Message = {
    id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1,
    content,
    author,
    time: new Date().toISOString(),
  };
  messages.push(newMessage);
  setToStorage(MESSAGES_STORAGE_KEY, messages);
  return newMessage;
}

/**
 * Deletes a message.
 */
export async function deleteMessage(messageId: number, requestingUserId: number): Promise<void> {
  await simulateDelay(400);
  const messageIndex = messages.findIndex(m => m.id === messageId);
  if (messageIndex === -1) {
    throw new Error('Message not found.');
  }
  const message = messages[messageIndex];
  if (message.author.id !== requestingUserId) {
    throw new Error('You are not authorized to delete this message.');
  }
  messages.splice(messageIndex, 1);
  setToStorage(MESSAGES_STORAGE_KEY, messages);
}