import React, { useState } from 'react';
import { 
  BookMarked, 
  Plus, 
  Search,
  LogOut,
  Folder as FolderIcon,
  Link as LinkIcon,
  MoreVertical,
  User,
  X,
  ExternalLink
} from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ThemeToggle } from '../components/ThemeToggle';
import type { Link, Folder } from '../types';

const MOCK_FOLDERS: Folder[] = [
  {
    id: '1',
    name: 'Development',
    createdAt: '2024-03-10'
  },
  {
    id: '2',
    name: 'Articles',
    createdAt: '2024-03-10'
  },
  {
    id: '3',
    name: 'Videos',
    createdAt: '2024-03-10'
  }
];

const MOCK_LINKS: Link[] = [
  {
    id: '1',
    title: 'React Documentation',
    url: 'https://react.dev',
    folderId: '1',
    createdAt: '2024-03-10',
    description: 'Official React documentation'
  },
  {
    id: '2',
    title: 'TypeScript Handbook',
    url: 'https://www.typescriptlang.org/docs/',
    folderId: '1',
    createdAt: '2024-03-10',
    description: 'TypeScript documentation'
  },
  {
    id: '3',
    title: 'Interesting Article',
    url: 'https://example.com/article',
    folderId: '2',
    createdAt: '2024-03-10',
    description: 'Must read article'
  }
];

export function Dashboard() {
  const [links, setLinks] = useState<Link[]>(MOCK_LINKS);
  const [folders, setFolders] = useState<Folder[]>(MOCK_FOLDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);
  
  // New link form state
  const [newLink, setNewLink] = useState({
    title: '',
    url: '',
    description: '',
    folderId: ''
  });

  // New folder form state
  const [newFolderName, setNewFolderName] = useState('');

  const filteredLinks = links.filter(link => 
    (!selectedFolderId || link.folderId === selectedFolderId) &&
    (link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     link.url.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    const link: Link = {
      id: Math.random().toString(36).substr(2, 9),
      ...newLink,
      createdAt: new Date().toISOString()
    };
    setLinks([...links, link]);
    setNewLink({ title: '', url: '', description: '', folderId: '' });
    setIsAddLinkModalOpen(false);
  };

  const handleAddFolder = (e: React.FormEvent) => {
    e.preventDefault();
    const folder: Folder = {
      id: Math.random().toString(36).substr(2, 9),
      name: newFolderName,
      createdAt: new Date().toISOString()
    };
    setFolders([...folders, folder]);
    setNewFolderName('');
    setIsAddFolderModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <BookMarked className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                LinkVault
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="outline" icon={User}>
                Profile
              </Button>
              <Button variant="secondary" icon={LogOut}>
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Actions */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              icon={Search}
            />
          </div>
          <div className="flex space-x-4">
            <Button icon={FolderIcon} onClick={() => setIsAddFolderModalOpen(true)}>
              New Folder
            </Button>
            <Button icon={Plus} onClick={() => setIsAddLinkModalOpen(true)}>
              Add Link
            </Button>
          </div>
        </div>

        {/* Folders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border-2 cursor-pointer
              ${!selectedFolderId ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'}
              hover:border-blue-500 transition-colors`}
            onClick={() => setSelectedFolderId(null)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FolderIcon className="h-5 w-5 text-blue-600" />
                <h3 className="font-medium text-gray-900 dark:text-white">
                  All Links
                </h3>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {links.length} links
              </span>
            </div>
          </div>
          {folders.map((folder) => (
            <div
              key={folder.id}
              className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border-2 cursor-pointer
                ${selectedFolderId === folder.id ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'}
                hover:border-blue-500 transition-colors`}
              onClick={() => setSelectedFolderId(folder.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FolderIcon className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {folder.name}
                  </h3>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {links.filter(link => link.folderId === folder.id).length} links
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Links List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredLinks.map((link) => (
              <div
                key={link.id}
                className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-750"
              >
                <div className="flex items-center space-x-3">
                  <LinkIcon className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {link.title}
                      </h4>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-500"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {link.url}
                    </p>
                    {link.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {link.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {folders.find(f => f.id === link.folderId)?.name}
                  </span>
                  <Button variant="secondary" size="sm" icon={MoreVertical} />
                </div>
              </div>
            ))}
            {filteredLinks.length === 0 && (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No links found
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Link Modal */}
      {isAddLinkModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Add New Link
              </h3>
              <button
                onClick={() => setIsAddLinkModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddLink} className="space-y-4">
              <Input
                label="Title"
                value={newLink.title}
                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                required
              />
              <Input
                label="URL"
                type="url"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                required
              />
              <Input
                label="Description"
                value={newLink.description}
                onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Folder
                </label>
                <select
                  value={newLink.folderId}
                  onChange={(e) => setNewLink({ ...newLink, folderId: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2
                    text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 
                    focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 
                    dark:text-gray-100"
                  required
                >
                  <option value="">Select a folder</option>
                  {folders.map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsAddLinkModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Add Link
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Folder Modal */}
      {isAddFolderModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Create New Folder
              </h3>
              <button
                onClick={() => setIsAddFolderModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddFolder} className="space-y-4">
              <Input
                label="Folder Name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                required
              />
              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsAddFolderModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Create Folder
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}