export type Link = {
  id: string;
  title: string;
  url: string;
  folderId: string;
  createdAt: string;
  description?: string;
};

export type Folder = {
  id: string;
  name: string;
  createdAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type Theme = 'light' | 'dark';