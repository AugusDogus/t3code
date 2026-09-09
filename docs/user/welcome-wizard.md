# Welcome wizard

Backplane shows a setup flow when you open a new installation or connect to the
hosted app for the first time. Existing workspaces skip this flow.

## Choose a connection

- **This computer** runs agents on the computer that hosts Backplane. It does not
  require an account.
- **T3 Connect** connects computers that are signed in to your account. Run
  `backplane connect` for a command-line host, then run
  `backplane serve` so the computer stays available.
- **Pair a server** connects directly to a server on your network or tailnet.
  Start the server with `backplane serve`, then run `backplane pair --tailscale` and
  paste the pairing link. You can also run `backplane serve --host <address>` and
  use `backplane pair` when the server is already reachable on your network.

The command-line examples require a locally built Backplane CLI on `PATH`.
For an AppImage host, create its pairing link in **Settings → Connections**.

If Backplane cannot confirm the workspace during startup, the setup flow shows
**Still connecting** instead of opening the app. Select **Reload** to try again.

If Backplane cannot read your saved settings, it shows **Could not read settings**.
Select **Retry** after storage becomes available. Setup does not replace
unreadable settings with defaults.

## Check your agents

Backplane checks the selected computer for Claude Code and Codex. If an agent is
not installed or signed in, select its action to open a terminal with the
correct command ready to run. Other providers can be enabled in Settings.

The setup terminal uses the home directory and environment configured for the
selected provider instance. Sensitive values remain redacted in Settings and
terminal metadata while the terminal process can use them.

## Import your projects

Backplane finds directories that Claude Code or Codex has used. The default
selection includes projects active within the last 30 days. Select **Choose**
to include older projects or change the selection.

A large or malformed history can reach the scan limit. Backplane keeps the
projects it found and warns when projects or conversations may be missing.

Imported projects include Codex and Claude conversations active within the last
30 days. You can continue those conversations in Backplane.

Conversation import is best effort. Backplane keeps the first user prompt and the
newest remaining visible user and assistant messages, with 200 messages total.
It omits tool activity and attachments. For Codex, it omits generated setup
context only when a canonical user event and a valid shared turn ID identify the
same user turn. Ambiguous legacy or response-only context stays in the imported
conversation so Backplane does not remove user text. It reads one conversation at
a time and skips files larger than 16 MiB. It ignores malformed records and skips
unreadable or unparseable conversations.

Each import attempt reads up to 100 conversation files and 64 MiB per project,
with up to 100,000 input records. Run import again to continue a large batch.
Completed conversations are not imported again. You can continue without the
remaining history.

You can skip agent setup and project import. Select **Back** to return to a
previous step.
