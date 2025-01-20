const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

console.log("🔍 Checking FAISS Library Loading Path...");

// Detect Platform
const platform = os.platform();
let faissLibPath = path.join(__dirname, "lib");

if (platform === "win32") {
    console.log(`🛠 Windows - Checking if FAISS is loaded from ${faissLibPath}`);
    console.log(execSync('where faiss.dll').toString());
} else {
    const libEnvVar = platform === "darwin" ? "DYLD_LIBRARY_PATH" : "LD_LIBRARY_PATH";
    console.log(`🛠 ${platform.toUpperCase()} - Checking if FAISS is loaded from ${faissLibPath}`);
    console.log(execSync(`ldd build/Release/eada.node | grep faiss`).toString());
}

// Try to Load the FAISS Addon
console.log("🔍 Loading EADA-CPU addon...");
const eada = require('./build/Release/eada.node');

console.log("✅ FAISS Library Loaded Successfully!");
