/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const test = require('node:test');
const assert = require('node:assert');

const projectRoot = path.join(__dirname, '..');
const pagePath = path.join(projectRoot, 'app', 'page.tsx');

test('Devine Digital Academy landing page content and integrity tests', async (t) => {
  
  await t.test('Page file exists', () => {
    assert.ok(fs.existsSync(pagePath), 'app/page.tsx does not exist');
  });

  const pageContent = fs.readFileSync(pagePath, 'utf-8');

  await t.test('Contains correct Razorpay payment link', () => {
    const enrollLinkPattern = /https:\/\/rzp\.io\/rzp\/G9oTVv8Z/;
    assert.ok(enrollLinkPattern.test(pageContent), 'Razorpay payment URL is missing or incorrect');
  });

  await t.test('Contains Mr. Vivek Maurya as mentor', () => {
    assert.ok(pageContent.includes('Mr. Vivek Maurya'), 'Mentor name Vivek Maurya is missing');
  });

  await t.test('Contains ₹999 price tags', () => {
    assert.ok(pageContent.includes('₹999'), 'Course pricing of ₹999 is missing');
  });

  await t.test('Does not contain unused Clock import from lucide-react', () => {
    const clockImportPattern = /\bClock\b/;
    const lucideImport = pageContent.slice(0, pageContent.indexOf('from "lucide-react"'));
    assert.ok(!clockImportPattern.test(lucideImport), 'Unused Clock import is still present');
  });

  await t.test('Unescaped quotes have been resolved', () => {
    // Check that we don't have common unescaped quote occurrences in JSX
    assert.ok(!pageContent.includes("Tools You'll Master"), 'Unescaped quote "Tools You\'ll Master" found');
    assert.ok(!pageContent.includes("Industry's most powerful"), 'Unescaped quote "Industry\'s most powerful" found');
    assert.ok(!pageContent.includes("You'll be equipped to"), 'Unescaped quote "You\'ll be equipped to" found');
    assert.ok(!pageContent.includes("Don't miss your chance"), 'Unescaped quote "Don\'t miss your chance" found');
    assert.ok(!pageContent.includes("won't last"), 'Unescaped quote "won\'t last" found');
  });

  await t.test('Contains co-founder title, reviews, and video embeds from live site migration', () => {
    assert.ok(pageContent.includes('Mr. Vivek Maurya (Co-Founder, Devine Digital Academy)'), 'Co-founder line in hero is missing');
    assert.ok(pageContent.includes('Lakhwinder Chouhan'), 'Student review from Lakhwinder Chouhan is missing');
    assert.ok(pageContent.includes('Nilofar digital'), 'Student review from Nilofar digital is missing');
    assert.ok(pageContent.includes('2wx8YFyenbc'), 'Main promotional video embed ID is missing');
    assert.ok(pageContent.includes('eQh4P4bl5TA'), 'Aarti Rai success story video embed ID is missing');
    assert.ok(pageContent.includes('YqWambOuoC0'), 'Doshant Singh success story video embed ID is missing');
  });

  await t.test('Runs ESLint check successfully', () => {
    try {
      execSync('npm run lint', { cwd: projectRoot, stdio: 'pipe' });
      assert.ok(true, 'ESLint check passed');
    } catch (error) {
      assert.fail(`ESLint checks failed: ${error.stdout.toString()}`);
    }
  });

  await t.test('Runs Next.js production build successfully', () => {
    try {
      execSync('npm run build', { cwd: projectRoot, stdio: 'pipe' });
      assert.ok(true, 'Next.js build passed');
    } catch (error) {
      assert.fail(`Next.js production build failed: ${error.stdout.toString() || error.message}`);
    }
  });

});
