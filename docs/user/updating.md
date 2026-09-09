# Updating Backplane

Download a newer AppImage from [Backplane Releases](https://github.com/i2cjak/Backplane/releases),
close Backplane, and replace the previous AppImage. Threads and settings stay in
`~/.backplane/userdata`, or `userdata` under your configured `BACKPLANE_HOME`.

The app you use and the server running your agents can be on different machines.
When a server is behind your web or desktop app, an update notice appears in the
conversation and **Settings → Connections**. Update the machine named in that
notice.

## Before you update

Server updates restart the connection and can interrupt active agents and
terminal commands. Saved threads, settings, and project files remain.

**Settings → General → Continue threads after restarts** is off by default.
Enable it to resume supported active threads after an update, crash, or machine
restart. Changes are saved to connected environments that support this setting;
update older servers first. If a supported environment was offline or has a
different value, use **Apply to all** in Settings after it connects.
The host app or server must start again on that machine;
the setting does not enable automatic startup. Terminal commands may still be
interrupted, and threads without saved provider resume state need a new message.
If you previously enabled continuation for updates, enable this setting once
to allow recovery without a connected client.

## Update a connected server

The offered action depends on how the server runs:

| Action                     | What to do                                                                                                                                                                                      |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Update server**          | Keep the client open while it installs and reconnects. Supported background services update remotely. For a desktop-hosted server, this also closes and relaunches the desktop app on the host. |
| **Update the desktop app** | Update the desktop app on the machine running the server, then reopen it if needed.                                                                                                             |
| **Copy update command**    | Stop the command-line server on its host and relaunch with the copied command, keeping your usual startup options.                                                                              |

The `npx t3` commands manage upstream T3 Code servers, not Backplane. Backplane
release versions do not correspond to T3 Code package versions. For an upstream
background service, run its chosen T3 Code version on the host:

```sh
npx t3@<t3-version> service update
```

Replace `<t3-version>` with a published T3 Code version compatible with that
server's clients. An older
service launcher may require this local update before it supports remote updates
and rollback.

For an upstream foreground server, use `npx t3@<t3-version>`. Add
`serve` if you normally run without a browser, and preserve options such as
`--host` or `--tailscale-serve`. See
[background services](./background-service.md) for service management.

## If an update fails

Keep the client open until it reconnects or reports a failure. A failed service
update can roll back to the previous version. If the update still fails:

1. Retry the offered action once.
2. Check that you updated the server's machine, not only the device you are using.
3. For an upstream command-line server, stop it and relaunch a compatible T3 Code version.

## Mobile updates

Backplane mobile releases are not available yet. For the upstream T3 Code mobile app,
install App Store or Google Play releases as usual. The mobile app can also
download updates in the background and apply them when you next leave the app.
It saves drafts and queued messages before restarting. If you keep the app open
for a long time, it may ask to install immediately; choosing **Later** leaves the
update queued for the next suitable moment.
