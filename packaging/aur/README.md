# AUR packaging

This directory contains templates for the `backplane-bin` and `backplane-nightly-bin` AUR packages.
Both repackage the official x86_64 AppImage from Backplane GitHub Releases. The templates contain
placeholders and are refreshed by `scripts/release.sh` for a supported release tag before they are
built or published.

## Publishing

The release workflow calls `.github/workflows/publish-aur.yml` after publishing a GitHub release;
the workflow can also be run manually for a specific tag. It selects the stable or nightly
package, then updates its version and checksums, builds it, regenerates `.SRCINFO`, and pushes it
to the AUR.

To validate a release on Arch Linux:

```bash
sudo pacman -Syu --needed base-devel github-cli jq namcap
GH_TOKEN=$(gh auth token) RELEASE_TAG=<published-release-tag> \
  packaging/aur/scripts/release.sh
```
