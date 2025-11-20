# 📦 Installing Node.js on Windows

## Option 1: Official Installer (Recommended)

1. **Download Node.js**
   - Go to: https://nodejs.org/
   - Download the **LTS (Long Term Support)** version
   - Choose the Windows Installer (.msi) for your system (64-bit recommended)

2. **Run the Installer**
   - Double-click the downloaded `.msi` file
   - Follow the installation wizard
   - ✅ **IMPORTANT**: Make sure "Add to PATH" is checked during installation
   - Click "Next" through all steps
   - Click "Install" (may require admin privileges)
   - Click "Finish" when done

3. **Verify Installation**
   - Close and reopen your PowerShell/terminal
   - Run these commands:
   ```powershell
   node --version
   npm --version
   ```
   - You should see version numbers (e.g., v20.10.0 and 10.2.3)

## Option 2: Using Chocolatey (If you have it)

If you have Chocolatey package manager installed:
```powershell
choco install nodejs-lts
```

## Option 3: Using Winget (Windows Package Manager)

If you have Windows 11 or Windows 10 with winget:
```powershell
winget install OpenJS.NodeJS.LTS
```

## After Installation

1. **Close and reopen PowerShell** (important for PATH to update)

2. **Navigate to your project**:
   ```powershell
   cd C:\Users\prema\OneDrive\Desktop\B10x
   ```

3. **Install project dependencies**:
   ```powershell
   npm install
   ```

4. **Start the development server**:
   ```powershell
   npm run dev
   ```

## Troubleshooting

### If npm is still not recognized after installation:

1. **Restart your computer** (sometimes needed for PATH changes)

2. **Or manually add to PATH**:
   - Open System Properties → Environment Variables
   - Under "System variables", find "Path"
   - Add: `C:\Program Files\nodejs\`
   - Click OK and restart PowerShell

3. **Check if Node.js is installed but not in PATH**:
   ```powershell
   Test-Path "C:\Program Files\nodejs\node.exe"
   ```
   If this returns `True`, Node.js is installed but not in PATH.

## Quick Download Link

**Direct Download (LTS - Recommended):**
- 64-bit: https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi
- 32-bit: https://nodejs.org/dist/v20.10.0/node-v20.10.0-x86.msi

**Current Version:**
- Visit https://nodejs.org/ for the latest version

---

**Note:** After installing Node.js, you'll have both `node` and `npm` available in your terminal.
