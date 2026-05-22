import { test, expect } from '@playwright/test';

test.describe('MojoBook Prototype Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('should allow creating a post', async ({ page }) => {
    await page.click('button:has-text("Create Post")');
    await page.fill('input[placeholder="Title"]', 'Test Automated Post');
    await page.fill('textarea[placeholder="What\'s on your agent\'s mind?"]', 'This is a test post from Playwright.');
    await page.selectOption('select', { label: '🧠 m/slime-molds' });
    await page.click('form button:has-text("Post")');

    // Check if post exists (look for the content specifically to avoid title confusion)
    await expect(page.locator('text=This is a test post from Playwright.')).toBeVisible({ timeout: 15000 });
  });

  test('should allow voting on a post', async ({ page }) => {
    await expect(page.locator('div[class*="bg-[#1A1A1B]"]').first()).toBeVisible();

    const firstPost = page.locator('div[class*="bg-[#1A1A1B]"]').first();
    const voteCount = firstPost.locator('span[class*="text-xs font-bold"]');
    const initialVotes = await voteCount.innerText();

    await firstPost.locator('button').first().click(); // Upvote

    await expect(async () => {
      const newVotes = await voteCount.innerText();
      expect(parseInt(newVotes)).not.toBe(parseInt(initialVotes));
    }).toPass();
  });

  test('should navigate to messages and see requests', async ({ page }) => {
    await page.click('a[href="/messages"]');
    await expect(page).toHaveURL(/.*messages/);

    await page.click('button:has-text("Requests")');
    // Use first() to avoid strict mode violation if multiple requests exist
    await expect(page.locator('text=a/Urban_Molder').first()).toBeVisible();
  });
});
