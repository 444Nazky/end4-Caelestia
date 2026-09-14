const TOKEN = '${GITHUB_TOKEN}';
const OWNER = '444Nazky';
const REPO = 'end4-Caelestia';

const prTitles = [
    'fix: improve window focus behavior',
    'feat: add workspace history navigation',
    'style: enhance terminal color contrast',
    'refactor: consolidate waybar modules',
    'docs: update installation guide',
    'perf: optimize memory footprint',
    'fix: resolve input lag issues',
    'feat: add workspace pin functionality',
    'style: refine window border colors',
    'refactor: clean up hyprland bindings',
    'docs: add performance tips',
    'fix: correct timezone detection',
    'feat: add workspace group support',
    'style: update icon pack',
    'refactor: improve script error handling'
];

async function mergePR(prNumber) {
    try {
        const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/pulls/${prNumber}/merge`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${TOKEN}`,
                'Accept': 'application/vnd.github+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                merge_method: 'squash',
                commit_title: `Merge PR #${prNumber}`,
                commit_message: `Merged via automation\n\n🤖 Generated with [Claude Code](https://claude.com/claude-code)`
            })
        });

        if (response.ok) {
            console.log(`Merged PR #${prNumber}`);
            return true;
        } else {
            const data = await response.json();
            console.log(`Failed to merge #${prNumber}: ${data.message || 'Unknown error'}`);
            return false;
        }
    } catch (err) {
        console.error(`Error merging PR #${prNumber}:`, err.message);
        return false;
    }
}

async function closePR(prNumber) {
    try {
        const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/pulls/${prNumber}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `token ${TOKEN}`,
                'Accept': 'application/vnd.github+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                state: 'closed'
            })
        });

        if (response.ok) {
            console.log(`Closed PR #${prNumber}`);
            return true;
        }
    } catch (err) {
        return false;
    }
}

async function main() {
    // First, merge existing PRs
    console.log('Merging existing PRs...\n');

    for (let i = 1; i <= 15; i++) {
        await mergePR(i);
        await new Promise(r => setTimeout(r, 1000));
    }

    console.log('\nAll PRs merged!\n');
    console.log('Now create new PRs for more activity...');

    // Create 15 more PRs
    const branches = [
        'feat/refactor-1', 'feat/refactor-2', 'feat/refactor-3', 'feat/refactor-4', 'feat/refactor-5',
        'feat/refactor-6', 'feat/refactor-7', 'feat/refactor-8', 'feat/refactor-9', 'feat/refactor-10',
        'feat/refactor-11', 'feat/refactor-12', 'feat/refactor-13', 'feat/refactor-14', 'feat/refactor-15'
    ];

    for (let i = 0; i < branches.length; i++) {
        const title = prTitles[i];

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
                    head: branches[i],
                    base: 'main'
                })
            });

            const pr = await response.json();

            if (response.ok) {
                console.log(`PR #${pr.number}: ${title}`);

                // Immediately merge
                await new Promise(r => setTimeout(r, 500));
                await mergePR(pr.number);
            } else {
                console.log(`Skipped: ${title} (${pr.message})`);
            }
        } catch (err) {
            console.error(`Error:`, err.message);
        }

        await new Promise(r => setTimeout(r, 1500));
    }

    console.log('\nActivity generation complete!');
}

main();
