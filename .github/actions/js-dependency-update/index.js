const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');

async function run() {
  const baseBranch = core.getInput('base-branch');
  const targetBranch = core.getInput('target-branch');
  const workingDirectory = core.getInput('working-directory');
  const ghToken = core.getInput('gh-token');
  const debug = core.getBooleanInput('debug');

  const branchRegex = /^[a-zA-Z0-9-_.-\/]+$/;
  if (!branchRegex.test(baseBranch)) {
      core.setFailed('The base branch '+ baseBranch +'  is invalid.');
  }
  if (!branchRegex.test(targetBranch)) {
    core.setFailed('The target branch '+ targetBranch +'   is invalid.');
  }
  const directoryRegex = /^[a-zA-Z0-9-_.-\/][^.]+$/;
  if (!directoryRegex.test(workingDirectory)) {
      core.setFailed('The working directory '+ workingDirectory +' is invalid.');
  }
  core.info(`Base branch: ${baseBranch}`);
  core.info(`Target branch: ${targetBranch}`);
  core.info(`Working directory: ${workingDirectory}`);


  await exec.exec('npm', ['update'], { cwd: workingDirectory });

  let gitStatus = await exec.getExecOutput('git', ['status', '-s', 'package*.json'], { cwd: workingDirectory });

  if (gitStatus.stdout.length > 0) {
    core.info('[js-dependency-update] : There are updates available!');

    await exec.exec('git', ['config', 'user.email','runner@email.com'], { cwd: workingDirectory });
    await exec.exec('git', ['config', 'user.name','Runner '], { cwd: workingDirectory });

    try{
        await exec.exec('git', ['checkout','-b', targetBranch], { cwd: workingDirectory });
    } catch (e) {
        await exec.exec('git', ['checkout', targetBranch], { cwd: workingDirectory });
    }
    await exec.exec('git', ['add', '.'], { cwd: workingDirectory });
    await exec.exec('git', ['commit', '-m', 'chore(deps): update dependencies'], { cwd: workingDirectory });
    await exec.exec('git', ['push','-u', 'origin', targetBranch], { cwd: workingDirectory });

    // crear pull request
    const octokit = github.getOctokit(ghToken);
    try {
        await octokit.rest.pulls.create({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            title: `Update NPM dependencies`,
            body: `This pull request updates NPM packages`,
            base: baseBranch,
            head: targetBranch
        });
    } catch (e) {
          core.error('[js-dependency-update] : Something went wrong while creating the PR. Check logs below.');
          core.setFailed(e.message);
          core.error(e);
    }

  } else {
    core.info('[js-dependency-update] : No updates at this point in time.');
  }
}
// Ejecuta la función run
run();
