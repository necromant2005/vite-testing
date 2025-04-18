import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Blog from '../Blog';

const mockBlogPosts = [
  `---
title: Welcome Post
date: 2024-04-18
author: John Doe
category: Announcements
---
# Welcome to our blog
This is our welcome post.`,
  `---
title: Baking Tips
date: 2024-04-19
author: Jane Smith
category: Tips & Tricks
---
# Essential Baking Tips
Here are some essential baking tips.`,
  `---
title: Spring Special
date: 2024-04-20
author: Alice Johnson
category: Seasonal
---
# Spring Special Treats
Check out our spring special treats.`
];

// Mock the fetch function
global.fetch = vi.fn((url: string) => {
  const postIndex = url.includes('welcome-to-our-blog') ? 0 :
                   url.includes('baking-tips') ? 1 :
                   url.includes('spring-special') ? 2 : 0;
  
  return Promise.resolve({
    text: () => Promise.resolve(mockBlogPosts[postIndex]),
  });
}) as unknown as typeof fetch;

describe('Blog Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the blog title and description', () => {
    render(<Blog />);
    
    expect(screen.getByText('Our Blog')).toBeInTheDocument();
    expect(screen.getByText('Latest updates, recipes, and baking tips')).toBeInTheDocument();
  });

  it('loads and displays blog posts', async () => {
    render(<Blog />);
    
    // Wait for the posts to load
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(3);
    });

    // Check if the posts are displayed
    await waitFor(() => {
      expect(screen.getByText('Welcome Post')).toBeInTheDocument();
      expect(screen.getByText('Baking Tips')).toBeInTheDocument();
      expect(screen.getByText('Spring Special')).toBeInTheDocument();
      expect(screen.getByText(/By John Doe/)).toBeInTheDocument();
      expect(screen.getByText('Announcements')).toBeInTheDocument();
    });
  });

  it('navigates to post detail when clicking a post', async () => {
    render(<Blog />);
    
    // Wait for the posts to load
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(3);
    });

    // Find and click the first post
    const postTitle = await screen.findByText('Welcome Post');
    const postCard = postTitle.closest('.card');
    fireEvent.click(postCard!);

    // Check if we're in the detail view
    expect(screen.getByText('← Back to Blog')).toBeInTheDocument();
    expect(screen.getByText('Welcome to our blog')).toBeInTheDocument();
    expect(screen.getByText('This is our welcome post.')).toBeInTheDocument();
  });

  it('returns to blog list when clicking back button', async () => {
    render(<Blog />);
    
    // Wait for the posts to load
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(3);
    });

    // Find and click the first post
    const postTitle = await screen.findByText('Welcome Post');
    const postCard = postTitle.closest('.card');
    fireEvent.click(postCard!);

    // Click back button
    fireEvent.click(screen.getByText('← Back to Blog'));

    // Verify we're back to the list view
    expect(screen.getByText('Welcome Post')).toBeInTheDocument();
    expect(screen.queryByText('← Back to Blog')).not.toBeInTheDocument();
  });

  it('handles fetch errors gracefully', async () => {
    // Mock console.error to prevent error output in tests
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock fetch to reject
    global.fetch = vi.fn().mockRejectedValue(new Error('Failed to fetch'));

    render(<Blog />);

    // Wait for the error to be logged
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error loading blog posts:', expect.any(Error));
    });

    // Clean up
    consoleSpy.mockRestore();
  });
});