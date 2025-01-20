#!/bin/bash

echo "🔧 EADA eklentisini derliyoruz..."

# Build klasörünü temizle
rm -rf build
mkdir -p build/Release

# C++ kodunu derleme komutu
g++ -std=c++17 -shared -fPIC -fexceptions -frtti -fopenmp \
    -I/usr/include/node \
    -I./node_modules/node-addon-api \
    -I/usr/local/include -I./include \
    -L./lib -lfaiss \
    -Wl,-rpath,./lib \
    -o build/Release/eada.node src/eada.cpp

if [ $? -eq 0 ]; then
    echo "✅ Derleme başarılı: build/Release/eada.node"
else
    echo "❌ Derleme başarısız!"
    exit 1
fi
