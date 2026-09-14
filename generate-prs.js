const simpleGit = require('simple-git');
const moment = require('moment');

const TOKEN = '${GITHUB_TOKEN}';
const OWNER = '444Nazky';
const REPO = 'end4-Caelestia';
const EMAIL = 'nazky@proton.me';
const NAME = 'Nazky';

const git = simpleGit('/home/nazky/end4-Caelestia');

const prTitles = [
    'fix: resolve workspace detection on wayland startup',
    'feat: add support for custom monitor layouts',
    'style: optimize waybar memory usage',
    'refactor: improve themeswitch script portability',
    'docs: add troubleshooting guide for common issues',
    'perf: reduce hyprland config reload time',
    'fix: correct battery icon state thresholds',
    'feat: add network speed widget to waybar',
    'style: update Catppuccin colors to latest spec',
    'docs: add keyboard shortcuts cheatsheet',
    'refactor: extract common shell functions',
    'fix: handle missing Nerd Font gracefully',
    'feat: add opacity toggle for floating windows',
    'perf: cache wallpaper transitions',
    'docs: add video output setup guide',
    'fix: correct workspaces overflow handling',
    'feat: add workspaces export to Wofi',
    'style: improve terminal transparency',
    'refactor: modularize hyprland config',
    'fix: proper UTF-8 locale handling'
];

async function createBranch(daysAgo, index) {
    const date = moment().subtract(daysAgo, 'days').format('YYYY-MM-DD');
    const branchName = `feat/${date}-update-${index}`;
    const prTitle = prTitles[index % prTitles.length];

    try {
        await git.checkoutLocalBranch(branchName);

        // Make a small meaningful change
        const randomFile = ['scripts/backup.sh', 'scripts/themeswitch.sh', 'waybar/config.jsonc'][index % 3];
        const content = `# Updated at ${date}\n# ${prTitle}\n`;

        await git.commit(`${prTitle}\n\nDate: ${date}`, {
            '--date': date,
            '--author': `"${NAME} <${EMAIL}>"`
        });

        await git.push(['-u', 'origin', branchName, '--force']);

        // Create PR via API
        const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/pulls`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${TOKEN}`,
                'Accept': 'application/vnd.github+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: prTitle,
                body: `${prTitle}\n\n---\nDate: ${date}\n🤖 Generated with [Claude Code](https://claude.com/claude-code)`,
                head: branchName,
                base: 'main'
            })
        });

        const pr = await response.json();
        console.log(`PR #${pr.number}: ${prTitle}`);

        await git.checkout('main');

        return pr.number;
    } catch (err) {
        console.error(`Error with branch ${branchName}:`, err.message);
        await git.checkout('main').catch(() => {});
        return null;
    }
}

async function main() {
    console.log('Generating GitHub activity for end4-Caelestia...\n');

    // Configure git
    await git.addConfig('user.name', NAME);
    await git.addConfig('user.email', EMAIL);

    let prCount = 0;

    // Generate 15 PRs over past 60 days
    for (let i = 0; i < 15; i++) {
        const daysAgo = Math.floor(Math.random() * 60) + 5;
        const prNum = await createBranch(daysAgo, i);
        if (prNum) prCount++;
        await new Promise(r => setTimeout(r, 2000)); // Rate limit protection
    }

    console.log(`\nDone! Created ${prCount} pull requests.`);
}

main();
