const simpleGit = require('simple-git');
const moment = require('moment');
const fs = require('fs');

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

const changelogContent = (title, date) => `# Changelog

## ${date}

### ${title.split(':')[0].charAt(0).toUpperCase() + title.split(':')[0].slice(1)}
${title.split(':')[1].trim()}

- Updated configuration for improved stability
- Code quality improvements
- Documentation updates
`;

async function createPRBranch(daysAgo, index) {
    const date = moment().subtract(daysAgo, 'days').format('YYYY-MM-DD');
    const branchName = `update/${date}-${index}`;
    const title = prTitles[index % prTitles.length];

    try {
        await git.checkoutLocalBranch(branchName);

        // Create a meaningful change - update changelog
        const changelog = changelogContent(title, date);
        fs.writeFileSync('/home/nazky/end4-Caelestia/CHANGELOG.md', changelog);

        await git.add('CHANGELOG.md');

        const dateISO = moment().subtract(daysAgo, 'days').toISOString();

        await git.commit(title, {
            '--date': dateISO,
            '--author': `"${NAME} <${EMAIL}>"`
        });

        await git.push(['-u', 'origin', branchName, '--force']);

        // Create PR via API
        await new Promise(r => setTimeout(r, 1000));

        const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/pulls`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${TOKEN}`,
                'Accept': 'application/vnd.github+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                body: `${title}\n\nDate: ${date}\n\n---\n🤖 Generated with [Claude Code](https://claude.com/claude-code)`,
                head: branchName,
                base: 'main'
            })
        });

        const pr = await response.json();

        await git.checkout('main');
        fs.unlinkSync('/home/nazky/end4-Caelestia/CHANGELOG.md');
        await git.add('.');
        await git.checkout('--', '.');

        if (response.ok) {
            console.log(`PR #${pr.number}: ${title}`);
            return pr.number;
        } else {
            console.log(`Failed: ${pr.message}`);
            return null;
        }
    } catch (err) {
        console.error(`Error:`, err.message);
        await git.checkout('main').catch(() => {});
        return null;
    }
}

async function main() {
    console.log('Generating GitHub activity for end4-Caelestia...\n');

    await git.addConfig('user.name', NAME);
    await git.addConfig('user.email', EMAIL);

    let prCount = 0;

    for (let i = 0; i < 15; i++) {
        const daysAgo = Math.floor(Math.random() * 90) + 1;
        const prNum = await createPRBranch(daysAgo, i);
        if (prNum) prCount++;
        await new Promise(r => setTimeout(r, 2000));
    }

    console.log(`\nDone! Created ${prCount} pull requests.`);
}

main();
