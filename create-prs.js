const TOKEN = '${GITHUB_TOKEN}';
const OWNER = '444Nazky';
const REPO = 'end4-Caelestia';

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
    'docs: add video output setup guide'
];

const branches = [
    'update/2026-06-18-14',
    'update/2026-06-20-7',
    'update/2026-07-13-4',
    'update/2026-07-15-8',
    'update/2026-07-21-11',
    'update/2026-07-21-9',
    'update/2026-07-27-12',
    'update/2026-08-03-10',
    'update/2026-08-06-2',
    'update/2026-08-09-6',
    'update/2026-08-11-13',
    'update/2026-08-18-3',
    'update/2026-08-23-5',
    'update/2026-08-26-1',
    'update/2026-08-28-0'
];

async function createPR(branch, index) {
    const title = prTitles[index % prTitles.length];

    try {
        const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/pulls`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${TOKEN}`,
                'Accept': 'application/vnd.github+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                body: `${title}\n\n---\n🤖 Generated with [Claude Code](https://claude.com/claude-code)`,
                head: branch,
                base: 'main'
            })
        });

        const pr = await response.json();

        if (response.ok) {
            console.log(`PR #${pr.number}: ${title}`);
            return pr.number;
        } else {
            console.log(`Failed: ${pr.message}`);
            return null;
        }
    } catch (err) {
        console.error(`Error:`, err.message);
        return null;
    }
}

async function main() {
    console.log('Creating PRs...\n');

    let prCount = 0;

    for (let i = 0; i < branches.length; i++) {
        const prNum = await createPR(branches[i], i);
        if (prNum) prCount++;
        await new Promise(r => setTimeout(r, 1500));
    }

    console.log(`\nDone! Created ${prCount} pull requests.`);
}

main();
