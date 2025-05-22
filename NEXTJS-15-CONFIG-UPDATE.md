# Next.js 15 Configuration Update

## Issue Identified

Your Next.js application is showing the following warning:

```
⚠ Invalid next.config.js options detected: 
⚠     Unrecognized key(s) in object: 'serverComponentsExternalPackages' at "experimental"
⚠ See more info here: https://nextjs.org/docs/messages/invalid-next-config
⚠ `experimental.serverComponentsExternalPackages` has been moved to `serverExternalPackages`. Please update your next.config.js file accordingly.
```

This warning occurs because in Next.js 15, the configuration property `serverComponentsExternalPackages` has been moved from the `experimental` object to a top-level property called `serverExternalPackages`.

## Solution

I've created the following files to fix this issue:

1. **next.config.updated.js**
   - An updated version of your Next.js configuration with the correct property locations
   - The `serverComponentsExternalPackages` property has been moved to `serverExternalPackages`
   - All other configuration remains the same

2. **update-nextjs-config.bat**
   - A batch file that backs up your current config and applies the update

## How to Apply the Fix

Run the update script:

```
update-nextjs-config.bat
```

This will:
1. Back up your current configuration to `next.config.js.bak`
2. Replace your current configuration with the updated one

## Changes Made

The following changes have been made to the configuration:

1. Removed: 
   ```javascript
   experimental: {
     serverComponentsExternalPackages: ['sharp', 'canvas']
   }
   ```

2. Added:
   ```javascript
   experimental: {},
   serverExternalPackages: ['sharp', 'canvas']
   ```

This change maintains the same functionality but follows the new structure required by Next.js 15.

## After Applying the Fix

After applying the fix, you should be able to run your application without the configuration warning:

```
npm run dev
```

If you encounter any issues, you can restore your original configuration from the backup file (`next.config.js.bak`).