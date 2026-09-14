const simpleGit = require('simple-git');
const moment = require('moment');
const fs = require('fs');

const TOKEN = '${GITHUB_TOKEN}';
const OWNER = '444Nazky';
const REPO = 'end4-Caelestia';
const EMAIL = 'nazky@proton.me';
const NAME = 'Nazky';

const git = simpleGit('/home/nazky/end4-Caelestia');

const messages = [
    'Update configuration files',
    'Improve shell integration',
    'Add documentation updates',
    'Fix minor styling issues',
    'Enhance waybar modules',
    'Update theme colors',
    'Improve script reliability',
    'Add workspace improvements',
    'Update keybinding hints',
    'Fix terminal settings',
    'Enhance dotfiles structure',
    'Update comments and docs',
    'Improve script portability',
    'Add system info module',
    'Enhance visual feedback',
    'Update font configuration',
    'Fix notification settings',
    'Improve startup time',
    'Add performance tweaks',
    'Update environment variables'
];

async function createCommit(daysAgo, index) {
    const date = moment().subtract(daysAgo, 'days');
    const dateISO = date.toISOString();
    const branchName = `wip/${date.format('YYYY-MM-DD')}-${index}`;

    try {
        await git.checkoutLocalBranch(branchName);

        // Make a meaningful change
        const change = {
            timestamp: date.format('YYYY-MM-DD HH:mm:ss'),
            index: index,
            message: messages[index % messages.length]
        };

        fs.writeFileSync('/home/nazky/end4-Caelestia/.updates', JSON.stringify(change, null, 2));

        await git.add('.updates');

        await git.commit(messages[index % messages.length], {
            '--date': dateISO,
            '--author': `"${NAME} <${EMAIL}>"`
        });

        await git.push(['-u', 'origin', branchName, '--force']);

        console.log(`Branch: ${branchName}`);

        await git.checkout('main');
        fs.unlinkSync('/home/nazky/end4-Caelestia/.updates');

        return true;
    } catch (err) {
        console.error(`Error:`, err.message);
        await git.checkout('main').catch(() => {});
        return false;
    }
}

async function main() {
    console.log('Generating commit activity...\n');

    await git.addConfig('user.name', NAME);
    await git.addConfig('user.email', EMAIL);

    let count = 0;

    // Generate commits spread over 180 days
    for (let i = 0; i < 20; i++) {
        const daysAgo = Math.floor(Math.random() * 180) + 1;
        const success = await createCommit(daysAgo, i);
        if (success) count++;
        await new Promise(r => setTimeout(r, 1000));
    }

    console.log(`\nDone! Created ${count} commits across new branches.`);
    console.log('Open PRs at: https://github.com/444Nazky/end4-Caelestia/pulls');
}

main();
