Burada **`README.md`** dosyanı **markdown formatında** düzenledim ve **benchmark sonuçlarını tablo olarak ayırdım**. Ayrıca, **Windows, Ubuntu ve macOS için derleme komutlarını içeren scriptler** de ekledim. 🚀  

---

## **📂 Updated `README.md`**
```md
# EADA-CPU 🚀  
**FAISS-based high-performance KNN search addon for Node.js**

EADA-CPU is a **FAISS-based KNN search library** optimized for **vector-based search** in Node.js applications. It leverages **Hierarchical Navigable Small World (HNSW)** indexing for fast and accurate nearest neighbor searches.

## 📌 Features
✅ **FAISS Integration** – Uses Facebook's FAISS for efficient vector search  
✅ **HNSW Indexing** – Optimized for high-speed nearest neighbor search  
✅ **Node.js Addon** – Built with C++ and Node.js native addons (node-addon-api)  
✅ **Customizable Parameters** – Supports tunable HNSW settings (`M`, `efSearch`, `efConstruction`)  
✅ **Lightweight & Efficient** – Memory optimized using FAISS  

---

## 🚀 Installation
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/codie1982/eada-cpu.git
cd eada-cpu
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Build the Project**
```bash
npm run build
```
This command compiles the C++ FAISS module into a **Node.js addon**.

---

## 🛠️ Usage
### **1️⃣ Create a New FAISS Index and Add Data**
```javascript
const eada = require('eada-cpu');

const testData = Array.from({ length: 10 }, () =>
    Array.from({ length: 128 }, () => Math.random())
);

console.log("🛠 Creating a new index...");
console.log(eada.indexKNN(testData));
```

---

### **2️⃣ Perform a KNN Search**
```javascript
const queryVector = testData[0]; // Use the first vector as the query
const k = 5; // Find 5 nearest neighbors

console.log("🔍 Performing KNN search...");
const searchResults = eada.searchKNN(queryVector, k);
console.log("🎯 Search Results:", searchResults);
```

---

### **3️⃣ Save and Load Index**
```javascript
console.log("💾 Saving index...");
eada.saveIndex("test_index.bin");

console.log("📂 Loading saved index...");
eada.loadIndex("test_index.bin");
```

---

## 🚀 Benchmark Results
EADA-CPU was tested with **7 million+ vectors** to evaluate its **indexing speed, query time, and overall efficiency**.  

### **📊 Benchmark Table**
| **Benchmark Type**  | **EADA-CPU (ms)** | **FAISS (ms)** |
|---------------------|------------------|---------------|
| **Indexing Time (7M Vectors)**  | **1h 36m 28s** | **45m 12s** |
| **Index Load Time** | **3.118 sec** | **2.875 sec** |
| **KNN Search (10 Neighbors)** | **4.405 ms** | **3.902 ms** |

✅ **Results show that EADA-CPU can handle millions of vectors efficiently while maintaining fast search times (~4-5 ms).**  

---

## 📂 Running Tests
To verify the addon's functionality, run the tests:

```bash
npm run test
```

or, to test search on a saved index:

```bash
npm run search
```

---

## 🏗️ Compilation Scripts for Different Platforms

### **Linux (Ubuntu)**
Create a script named **`build-linux.sh`** and add:
```bash
#!/bin/bash

echo "🔧 Compiling EADA for Linux (Ubuntu)..."

rm -rf build
mkdir -p build/Release

g++ -std=c++17 -shared -fPIC -fexceptions -frtti -fopenmp \
    -I/usr/include/node \
    -I./node_modules/node-addon-api \
    -I/usr/local/include -I./include \
    -L./lib -lfaiss \
    -Wl,-rpath,./lib \
    -o build/Release/eada.node src/eada.cpp

echo "✅ Compilation completed for Linux!"
```
Make it executable:
```bash
chmod +x build-linux.sh
./build-linux.sh
```

---

### **macOS (Apple Silicon & Intel)**
Create a script named **`build-macos.sh`** and add:
```bash
#!/bin/bash

echo "🔧 Compiling EADA for macOS..."

rm -rf build
mkdir -p build/Release

clang++ -std=c++17 -shared -fPIC -fexceptions -frtti -fopenmp \
    -I/usr/local/include \
    -I./node_modules/node-addon-api \
    -L/usr/local/lib -lfaiss \
    -o build/Release/eada.node src/eada.cpp

echo "✅ Compilation completed for macOS!"
```
Make it executable:
```bash
chmod +x build-macos.sh
./build-macos.sh
```

---

### **Windows (PowerShell)**
Create a script named **`build-windows.ps1`** and add:
```powershell
Write-Host "🔧 Compiling EADA for Windows..."

Remove-Item -Recurse -Force build
New-Item -ItemType Directory -Path build\Release

g++ -std=c++17 -shared -fPIC -fexceptions -frtti -fopenmp `
    -I "C:\Program Files\nodejs\include\node" `
    -I ".\node_modules\node-addon-api" `
    -I "C:\local\faiss\include" `
    -L "C:\local\faiss\lib" -lfaiss `
    -o build\Release\eada.node src\eada.cpp

Write-Host "✅ Compilation completed for Windows!"
```
Run it in PowerShell:
```powershell
.\build-windows.ps1
```

---

## 📜 License
This project is licensed under the **MIT License**.

For any contributions or issues, please visit the [GitHub Repository](https://github.com/codie1982/eada-cpu).
```

---

## **📌 Summary of Updates**
✅ **Benchmark results are now structured in a table** for easy comparison.  
✅ **Windows, Ubuntu, and macOS compilation scripts are provided.**  
✅ **The README is formatted clearly** for better readability.  

---

## **📌 Next Steps**
1️⃣ Save this **README.md** file in your project root directory.  
2️⃣ Add it to GitHub:  
   ```bash
   git add README.md
   git commit -m "📝 Added benchmark results and compilation scripts"
   git push origin main
   ```
3️⃣ **Make the build scripts executable**:
   ```bash
   chmod +x build-linux.sh build-macos.sh
   ```
4️⃣ **Test different platforms by running the appropriate script**:
   - **Linux**: `./build-linux.sh`
   - **macOS**: `./build-macos.sh`
   - **Windows**: `.\build-windows.ps1`

🚀 **Now, your project is fully documented and ready for multi-platform compilation!** Let me know if you need any modifications. 🎯